export type TMatchParams = {
  id: string;
};

export type TQuestionParameters = {
  id?: number;
  title: string;
  tags: string[];
  creationDate: number;
  status: TStatus;
  popularityIndex: number;
  pictureUrl?: string;
  explanation?: string;
};

export interface IRequestData {
  url: string;
  values: TQuestionParameters;
}

export type TStatus = "OPENED" | "CLOSED";
