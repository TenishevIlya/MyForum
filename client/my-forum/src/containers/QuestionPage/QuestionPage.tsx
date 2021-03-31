import React from "react";
import { withRouter } from "react-router-dom";
import { IQuestionPageProps, IQuestionPageState } from "./QuestionPage.types";
import QuestionHeader from "../../components/QuestionHeader/QuestionHeader";
import QuestionExplanation from "../../components/QuestionExplanation/QuestionExplanation";
import Spinner from "../../components/Spinner/Spinner";
import { Divider } from "antd";
import { timestampToMilliseconds } from "../../features";
import Button from "../../components/Button/Button";
import { Modal, Form, Input, message } from "antd";
import { createPostRequest } from "../../features";
import Answer from "../Answer/Answer";
import { map } from "lodash";
import moment from "moment";
import { store } from "../../store/store";
import { isEmpty } from "lodash";

const { TextArea } = Input;

export const FormItemsNames = {
  answerExplanation: "answerExplanation",
  answerImg: "answerImg",
} as const;

class QuestionPage extends React.PureComponent<
  IQuestionPageProps,
  IQuestionPageState
> {
  constructor(props: IQuestionPageProps) {
    super(props);

    this.formRef = React.createRef();

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  private formRef: any;

  private readonly ComponentKeys = {
    formName: "addAnswerForm",
    formKey: "addAnswerFormKey",
  };

  private readonly FormLabels = {
    answer: "Текст ответа",
    answerImg: "Картинка к ответу",
  };

  private readonly questionId = this.props.match.params.id;

  public readonly state = {
    questionData: null,
    showAddAnswerModal: false,
    questionAnswers: null,
  } as IQuestionPageState;

  private logInMessage() {
    return message.error(
      "Для того, чтобы ответить на вопрос необоходимо авторизоваться",
    );
  }

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

  private handleModalOpen() {
    if (isEmpty(store.getState().personReducer)) {
      return this.logInMessage();
    }
    this.setState({ showAddAnswerModal: !this.state.showAddAnswerModal });
  }

  private handleAnswerSubmit() {
    const postData = {
      ...this.formRef.current.getFieldsValue(),
      questionId: this.questionId,
      creationDate: moment().unix() + 60 * moment().utcOffset(),
      userId: store.getState().personReducer[0].id,
    };
    createPostRequest({
      url: "http://localhost:4000/addAnswer",
      values: postData,
    });
    fetch(`http://localhost:4000/question/answers/${this.questionId}`)
      .then((res) => res.json())
      .then((answers) => this.setState({ questionAnswers: answers }));
    this.handleModalOpen();
  }

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
          >
            <TextArea
              placeholder={"Введите текст вопроса(не более 1000 символов)"}
              required
            />
          </Form.Item>
          <Form.Item
            label={this.FormLabels.answerImg}
            name={FormItemsNames.answerImg}
          ></Form.Item>
        </Form>
      </Modal>
    );
  }

  render() {
    const { questionData, questionAnswers } = this.state;

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
        />
        <Button
          text={"Добавить ответ"}
          type={"primary"}
          onClick={this.handleModalOpen}
        />
        <Divider />
        <QuestionExplanation explanationText={questionData.explanation} />
        <Divider />
        <h3>{`Ответов на вопрос ${questionAnswers.length}:`}</h3>
        {map(questionAnswers, (answer) => {
          return <Answer answerData={answer} />;
        })}
        {this.addAnswerModal}
      </>
    );
  }
}

export default withRouter(QuestionPage);
