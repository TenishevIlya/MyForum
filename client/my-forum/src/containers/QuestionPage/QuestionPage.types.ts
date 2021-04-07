import type { RouteComponentProps } from "react-router";
import type { TMatchParams, TQuestionParameters } from "../../utils/types";

export interface IQuestionPageProps extends RouteComponentProps<TMatchParams> {}

export interface IQuestionPageState {
  questionData: TQuestionParameters | null;
  showAddAnswerModal: boolean;
  questionAnswers: any;
}

export type TQuestionAnswer = {
  explanation: string;
};
