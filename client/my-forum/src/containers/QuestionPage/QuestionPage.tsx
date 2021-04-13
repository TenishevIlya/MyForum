import React from "react";
import { withRouter } from "react-router-dom";
import { IQuestionPageProps, IQuestionPageState } from "./QuestionPage.types";
import QuestionHeader from "../../components/QuestionHeader/QuestionHeader";
import QuestionExplanation from "../../components/QuestionExplanation/QuestionExplanation";
import Spinner from "../../components/Spinner/Spinner";
import { Divider, Empty } from "antd";
import { timestampToMilliseconds } from "../../features";
import { Modal, Form, Input, message } from "antd";
import { createPostRequest } from "../../features";
import Answer from "../Answer/Answer";
import moment from "moment";
import { store } from "../../store/store";
import { isEmpty, map } from "lodash";
import ImageContainer from "../../components/ImageContainer/ImageConatiner";
import { v4 } from "uuid";
import "./QuestionPage.styles.css";

const { TextArea } = Input;

// Названия полей формы для более удобной работы с их значениями при отправке на сервере
export const FormItemsNames = {
  answerExplanation: "answerExplanation",
  answerImg: "answerImg",
} as const;

// Контйнер страницы вопроса
class QuestionPage extends React.PureComponent<
  IQuestionPageProps,
  IQuestionPageState
> {
  constructor(props: IQuestionPageProps) {
    super(props);

    // Рефы для формы с текстовыми данными и формы с изображениями
    this.formRef = React.createRef();
    this.imageFormRef = React.createRef();

    // Привязка обработчиков к текущему контексту
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  private formRef: any;
  private imageFormRef: any;

  private readonly ComponentKeys = {
    formName: "addAnswerForm",
    formKey: "addAnswerFormKey",
  };

  // Названия полей формы
  private readonly FormLabels = {
    answer: "Текст ответа",
    answerImg: "Картинка к ответу",
  };

  private readonly questionId = this.props.match.params.id;

  // в state храним информацию о вопросе, об ответах на него, и поле отвечающее за отображение модалки
  public readonly state = {
    questionData: null,
    showAddAnswerModal: false,
    questionAnswers: null,
  } as IQuestionPageState;

  // Сообщение об ошибке, при попытке ответить без авторизации
  private logInMessage() {
    return message.error(
      "Для того, чтобы ответить на вопрос необоходимо авторизоваться",
    );
  }

  // Сообщение об удачном добавлении вопроса
  private successAddedMessage() {
    return message.success("Ваш ответ добавлен");
  }

  // Сообщение о неудачном добавлении вопроса
  private errorAddedMessage() {
    return message.success("Ошибка при добавлении ответа");
  }

  // При монтировании контейнера заправшиваем данные о вопросе и ответах на него
  public componentDidMount() {
    fetch(`http://localhost:4000/question/${this.questionId}`)
      .then((res) => res.json())
      .then((data) => this.setState({ questionData: data }));
    fetch(`http://localhost:4000/question/answers/${this.questionId}`)
      .then((res) => res.json())
      .then((answers) => this.setState({ questionAnswers: answers }));
    fetch(
      `http://localhost:4000/question/updatePopularity/${this.questionId}`,
      {
        method: "PUT",
        cache: "reload",
      },
    )
      .then((res) => res.json())
      .then((data) => data);
  }

  // Функция отвечающая за открытие модалки
  private handleModalOpen() {
    if (isEmpty(store.getState().personReducer)) {
      return this.logInMessage();
    }
    this.setState({ showAddAnswerModal: !this.state.showAddAnswerModal });
  }

  // Обработчик submit'a формы с ответом на вопрос
  private handleAnswerSubmit() {
    const formData = new FormData();
    const input = document.getElementById("image") as any;

    /**
     * Для отправки сообщений мы отдельно получаем данные из поля и формируем объект для их корректной отправки на сервер
     * Логика работы такая же, как и в контейнере AddQuestionForm
     */

    for (let i = 0; i < input.files.length; i++) {
      formData.append("inputFiles", input.files[i]);
    }

    // Инициализация уникального uuid для отправки изображений
    const answerUUID = v4();

    const postData = {
      ...this.formRef.current.getFieldsValue(),
      questionId: this.questionId,
      creationDate: moment().unix() + 60 * moment().utcOffset(),
      userId: store.getState().personReducer.id,
      answerUUID: answerUUID,
    };
    this.formRef.current.validateFields().then(() => {
      createPostRequest({
        url: "http://localhost:4000/addAnswer",
        values: postData,
      });
      fetch(`http://localhost:4000/addAnswerImage/${answerUUID}`, {
        method: "POST",
        body: formData,
      })
        .catch((err) => {
          // Вывод сообщения об ошибке
          this.errorAddedMessage();
          return err;
        })
        .then((res) => {
          // Очистка полей формы после submit'a
          this.formRef.current.resetFields();
          // Вывод сообщения об удачном добавлении
          this.successAddedMessage();
          return res.json();
        })
        // Запрос на уже обновленные данные с учетом последнего submit'a
        .then(() => {
          fetch(`http://localhost:4000/question/answers/${this.questionId}`)
            .then((res) => res.json())
            .then((answers) => this.setState({ questionAnswers: answers }));
        });
      this.handleModalOpen();
    });
  }

  // Функция ренера модального окна
  private get addAnswerModal() {
    const { showAddAnswerModal } = this.state;

    return (
      <Modal
        title={"Добавьте ваш ответ"}
        visible={showAddAnswerModal}
        onOk={this.handleAnswerSubmit}
        onCancel={this.handleModalOpen}
        okText={"Ответить"}
        cancelText={"Отменить"}
      >
        <Form
          key={this.ComponentKeys.formKey}
          name={this.ComponentKeys.formName}
          ref={this.formRef}
          layout={"vertical"}
        >
          <Form.Item
            label={this.FormLabels.answer}
            name={FormItemsNames.answerExplanation}
            rules={[
              {
                required: true,
                message: "Поле обязательно к заполнению",
              },
            ]}
          >
            <TextArea
              placeholder={"Введите текст вопроса(не более 1000 символов)"}
              className={"textarea-styles"}
            />
          </Form.Item>
          <Form.Item
            label={this.FormLabels.answerImg}
            name={FormItemsNames.answerImg}
          >
            <input
              id={"image"}
              type="file"
              name="answerImage"
              multiple
              ref={this.imageFormRef}
              style={{ marginBottom: "25px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  /**
   * Рендер всех компонентов контейнера
   * Если есть вопросы - появится их список
   * Иначе пустой контейнер с сообщением
   */
  render() {
    const { questionData, questionAnswers } = this.state;

    // Спиннер, появляющийся тогда, пока данные еще не загрузились
    if (!questionData || !questionAnswers) {
      return <Spinner size={"large"} />;
    }

    return (
      <>
        <QuestionHeader
          title={questionData.title}
          timesViewed={questionData.popularityIndex}
          creationDateTimestamp={timestampToMilliseconds(
            questionData.creationDate,
          )}
          addQuestionCallback={this.handleModalOpen}
        />
        <ImageContainer imagesPaths={this.state.questionData?.pictureUrl} />
        <Divider />
        <QuestionExplanation explanationText={questionData.explanation} />
        <Divider />
        <h3>{`Ответов на вопрос ${questionAnswers.length}:`}</h3>
        {!isEmpty(questionAnswers) ? (
          map(questionAnswers, (answer) => {
            return <Answer answerData={answer} />;
          })
        ) : (
          <Empty description={"Ответов на данный вопрос пока что нет"} />
        )}
        {this.addAnswerModal}
      </>
    );
  }
}

export default withRouter(QuestionPage);
