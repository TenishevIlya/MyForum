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

export interface IRequestData<T> {
  url: string;
  values: T;
  callBack?(data?: any): void;
}

export type TStatus = "OPENED" | "CLOSED";

export type TAuthorize = {
  email: string;
  password: string;
  passwordRepeat: string;
};
