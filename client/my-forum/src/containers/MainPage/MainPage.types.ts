import type { TQuestionParameters } from "../../utils/types";

// Интерфейс для state контейнера
export interface IMainPageState {
  questions: TQuestionParameters[] | null;
  currentLimitText: string;
}

// Интерфейс для props контейнера
export interface IMainPageProps {}
