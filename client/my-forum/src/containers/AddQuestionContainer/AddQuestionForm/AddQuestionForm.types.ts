import { FormItemsNames } from "./AddQuestionForm";
import { RouteComponentProps } from "react-router";

// Интерфейс, описывающий поля формы
export interface IFormValues {
  [FormItemsNames.questionTitle]: string;
  [FormItemsNames.questionTags]: string[];
  [FormItemsNames.questionExplanation]: string;
  [FormItemsNames.questionPictures]: any;
}

// Интерфейс компонента
export interface IAddQuestionFormProps extends RouteComponentProps {}
