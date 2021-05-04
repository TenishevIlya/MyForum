import type { TQuestionParameters } from "../../utils/types";

// Интерфейс для state контейнера
export interface IMainPageState {
  questions: TQuestionParameters[] | null;
  currentLimit: number;
}

// Интерфейс для props контейнера
export interface IMainPageProps {}
