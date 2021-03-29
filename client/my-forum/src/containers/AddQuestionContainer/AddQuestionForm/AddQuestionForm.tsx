import React from "react";
import { Form, Input, Select, Tag, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { spheres } from "../../../const";
import { createPostRequest, keyGenerator } from "../../../features";
import type { TStatus } from "../../../utils/types";
import "./AddQuestionForm.styles.css";
import Button from "../../../components/Button/Button";
import type {
  IFormValues,
  IAddQuestionFormProps,
} from "./AddQuestionForm.types";
import { map } from "lodash";
import { withRouter } from "react-router";

// библотека для работы со временем
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

class AddQuestionForm extends React.PureComponent<IAddQuestionFormProps> {
  private formRef: any;

  constructor(props: IAddQuestionFormProps) {
    super(props);

    this.formRef = React.createRef();

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

  // стили для расположения кнопки
  private readonly tailLayout = {
    wrapperCol: { offset: 2, span: 2 },
  };

  // стили для расположения элементов формы
  private readonly layout = {
    labelCol: { span: 2 },
  };

  // метод рендеринга тегов внутри выпадающего списка
  private tagRenderer(props: any): React.ReactElement {
    const { label, value, onClose } = props;
    return (
      <Tag color={value} closable={true} onClose={onClose}>
        {label}
      </Tag>
    );
  }

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

  // функция отправки данных для создания вопроса
  private handleOnFinish(values: IFormValues) {
    // console.log(this.formRef.current.submit());
    const postData = {
      title: values.questionTitle,
      explanation: values.questionExplanation,
      tags: values.questionTags,
      creationDate: moment().unix() + 60 * moment().utcOffset(),
      status: "OPENED" as TStatus,
      popularityIndex: 0,
      pictures: values.questionPictures,
    };
    createPostRequest({
      url: "http://localhost:4000/addQuestion",
      values: postData,
    });
  }

  render() {
    return (
      <div className={"add-question-form"}>
        <h3 className={"add-question-form-header"}>
          {"Задайте свой вопрос здесь"}
        </h3>
        <Form
          {...this.layout}
          name={this.ComponentKeys.formName}
          key={this.ComponentKeys.formKey}
          onFinish={this.handleOnFinish}
          initialValues={{ questionTags: [spheres[0].value] }}
          encType="multipart/form-data"
        >
          <Form.Item
            label={this.FormLabels.question}
            name={FormItemsNames.questionTitle}
          >
            <TextArea
              placeholder={"Введите текст вопроса(не более 1000 символов)"}
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
          {/* <form
            action="http://localhost:4000/addQuestion"
            encType="multipart/form-data"
            method="post"
            ref={this.formRef}
          >
            <div>
              <input type="file" name="test" />
            </div>
          </form> */}

          <Form.Item {...this.tailLayout} name={FormItemsNames.submitBtn}>
            <Button text="Отправить" type={"primary"} htmlType={"submit"} />
          </Form.Item>
        </Form>

        {/* <form
          action="http://localhost:4000/test"
          encType="multipart/form-data"
          method="post"
        >
          <div>
            <input type="file" name="test" />
            <input
              type="text"
              placeholder="Number of speakers"
              name="nspeakers"
            />
            <input type="submit" value="Get me the stats!" />
          </div>
        </form> */}
      </div>
    );
  }
}

export default withRouter(AddQuestionForm);
