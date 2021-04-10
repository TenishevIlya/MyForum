// Интерфейс props компонента
export interface IQuestionHeaderProps {
  title: string;
  creationDateTimestamp: number;
  timesViewed: number;
  addQuestionCallback(): void;
}
