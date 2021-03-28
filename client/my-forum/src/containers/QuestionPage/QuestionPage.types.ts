import { RouteComponentProps } from "react-router";
import { TMatchParams, TQuestionParameters } from "../../utils/types";

export interface IQuestionPageProps extends RouteComponentProps<TMatchParams> {}

export interface IQuestionPageState {
  questionData: TQuestionParameters | null;
}