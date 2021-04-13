import type { RouteComponentProps } from "react-router";
import type { TMatchParams, TQuestionParameters } from "../../utils/types";

// Интерфейс для контейнера вопроса, расширяющий пропсы роутинга
export interface IQuestionPageProps extends RouteComponentProps<TMatchParams> {}

// Интерфейс для state контейнера
export interface IQuestionPageState {
  questionData: TQuestionParameters | null;
  showAddAnswerModal: boolean;
  questionAnswers: any;
}

// Тип для ответа
export type TQuestionAnswer = {
  explanation: string;
};
