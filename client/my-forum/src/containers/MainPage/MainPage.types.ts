import type { TQuestionParameters } from "../../utils/types";

export interface IMainPageState {
  questions: TQuestionParameters[] | null;
  currentLimitText: string;
}

export interface IMainPageProps {}
