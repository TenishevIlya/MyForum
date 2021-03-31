export interface IAnswerTypesProps {
  answerData: TAnswerData;
}

export type TAnswerData = {
  explanation: string;
  authorName?: string;
  creation_date: number;
  email?: string;
};
