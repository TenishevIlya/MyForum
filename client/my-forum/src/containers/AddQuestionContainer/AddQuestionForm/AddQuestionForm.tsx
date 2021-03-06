import React from "react";
import { Form, Input, Select, message } from "antd";
import { spheres } from "../../../const";
import { createPostRequest, keyGenerator } from "../../../features";
import "./AddQuestionForm.styles.css";
import Button from "../../../components/Button/Button";
import type {
  IFormValues,
  IAddQuestionFormProps,
} from "./AddQuestionForm.types";
import { map } from "lodash";
import { withRouter } from "react-router";
import type { TQuestionParameters } from "../../../utils/types";
import { v4 } from "uuid";

import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

export const FormItemsNames = {
  questionTitle: "questionTitle",
  questionTags: "questionTags",
  questionPictures: "questionPictures",
  questionExplanation: "questionExplanation",
  submitBtn: "submitBtn",
} as const;

// Компонент формы для добавления вопроса
class AddQuestionForm extends React.PureComponent<IAddQuestionFormProps> {
  private formRef: any;
  private imageFormRef: any;

  // Генерация уникального uuid для отправки изображений
  private readonly questionUUID = v4();

  constructor(props: IAddQuestionFormProps) {
    super(props);

    /**
     * Создаем рефы для форм с текстовыми данными и формы с изображением
     * Рефы дают возможность получить доступ к DOM-узлам или React-элементам, созданным в рендер-методе.
     */
    this.formRef = React.createRef();
    this.imageFormRef = React.createRef();

    this.handleOnFinish = this.handleOnFinish.bind(this);
  }

  // Названия полей формы
  private readonly FormLabels = {
    question: "Вопрос",
    tags: "Тэги",
    pictures: "Добавьте фото",
    explanation: "Объяснение вопроса",
  };

  // ключи для элементов компонента
  private readonly ComponentKeys = {
    formName: "addForm",
    formKey: "addFormKey",
  };

  // метод рендеринга компонентов выпадающегося списка
  private selectItemsRenderer() {
    return map(spheres, (sphere, index) => {
      const { value } = sphere;
      return (
        <Option key={keyGenerator(index, sphere)} value={value}>
          {value}
        </Option>
      );
    });
  }

  private successAddedMessage() {
    return message.success("Ваш вопрос добавлен");
  }

  private errorAddedMessage() {
    return message.success("Ошибка при добавлении вопроса");
  }

  // функция отправки данных для создания вопроса
  private handleOnFinish(values: IFormValues) {
    /**
     * Для отправки сообщений мы отдельно получаем данные из поля и формируем объект для их корректной отправки на сервер
     */
    const formData = new FormData();
    const input = document.getElementById("image") as any;

    // Добавляем данные изображения для отправки
    for (let i = 0; i < input.files.length; i++) {
      formData.append("inputFiles", input.files[i]);
    }

    // Текстовые данные для отправки
    const postData = {
      questionId: this.questionUUID,
      title: values.questionTitle,
      explanation: values.questionExplanation,
      tags: values.questionTags,
      creationDate: moment().unix() + 60 * moment().utcOffset(),
      popularityIndex: 0,
      pictures: values.questionPictures,
    };
    // Отправляем текстовые данные на сервер
    createPostRequest<TQuestionParameters>({
      url: "http://localhost:4000/addQuestion",
      values: postData,
    });
    // Отдельно отправляем данные по изображениям на сервер
    fetch(`http://localhost:4000/addQuestionImage/${this.questionUUID}`, {
      method: "POST",
      body: formData,
    })
      .catch((err) => {
        this.errorAddedMessage();
        return err;
      })
      .then((res) => {
        this.formRef.current.resetFields();
        this.successAddedMessage();
        // Переход на главную в случае успешного добавления
        this.props.history.push("/");
        return res.json();
      });
  }

  render() {
    return (
      <div className={"add-question-form"}>
        <h3 className={"add-question-form-header"}>
          {"Задайте свой вопрос здесь"}
        </h3>
        <Form
          name={this.ComponentKeys.formName}
          key={this.ComponentKeys.formKey}
          onFinish={this.handleOnFinish}
          initialValues={{ questionTags: [spheres[0].value] }}
          encType="multipart/form-data"
          layout={"vertical"}
          ref={this.formRef}
        >
          <Form.Item
            label={this.FormLabels.question}
            name={FormItemsNames.questionTitle}
          >
            <TextArea
              placeholder={"Введите текст вопроса(не более 1000 символов)"}
              required
              className={"textarea-styles"}
            />
          </Form.Item>
          <Form.Item
            label={this.FormLabels.explanation}
            name={FormItemsNames.questionExplanation}
          >
            <TextArea
              placeholder={
                "Введите объяснение для вопроса(не более 1000 символов)"
              }
              required
            />
          </Form.Item>
          <Form.Item
            label={this.FormLabels.tags}
            name={FormItemsNames.questionTags}
          >
            <Select mode="multiple" showArrow showSearch={false}>
              {this.selectItemsRenderer()}
            </Select>
          </Form.Item>
          <Form.Item
            label={this.FormLabels.pictures}
            name={FormItemsNames.questionPictures}
          >
            <input
              id={"image"}
              type="file"
              name="test"
              multiple
              ref={this.imageFormRef}
            />
          </Form.Item>
          <Form.Item name={FormItemsNames.submitBtn}>
            <Button
              text="Отправить"
              type={"primary"}
              htmlType={"submit"}
              block
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(AddQuestionForm);
