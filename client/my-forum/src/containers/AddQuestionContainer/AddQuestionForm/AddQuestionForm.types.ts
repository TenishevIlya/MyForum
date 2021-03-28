import { FormItemsNames } from "./AddQuestionForm";
import { RouteComponentProps } from "react-router";

export interface IFormValues {
  [FormItemsNames.questionTitle]: string;
  [FormItemsNames.questionTags]: string[];
  [FormItemsNames.questionExplanation]: string;
  [FormItemsNames.questionPictures]: any;
}

export interface IAddQuestionFormProps extends RouteComponentProps {
  onSuccess(): void;
}
