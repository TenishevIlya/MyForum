import { PureComponent } from "react";
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

class AddQuestionForm extends PureComponent<IAddQuestionFormProps> {
  constructor(props: IAddQuestionFormProps) {
    super(props);

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
      // url: "http://localhost:40000/addQuestion",
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
          <Form.Item
            {...this.tailLayout}
            name={FormItemsNames.questionPictures}
          >
            <Upload>
              <Button text={"Загрузите фото"} icon={<UploadOutlined />} />
            </Upload>
          </Form.Item>
          <Form.Item {...this.tailLayout} name={FormItemsNames.submitBtn}>
            <Button text="Отправить" type={"primary"} htmlType={"submit"} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(AddQuestionForm);
