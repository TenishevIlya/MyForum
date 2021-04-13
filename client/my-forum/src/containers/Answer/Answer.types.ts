// интерфейс контейнера ответа
export interface IAnswerTypesProps {
  answerData: TAnswerData;
}

// тип для данных ответа
export type TAnswerData = {
  explanation: string;
  authorName?: string;
  creation_date: number;
  email?: string;
  picture_url: string[] | undefined;
  name: string;
  avatar_url: string[];
};
