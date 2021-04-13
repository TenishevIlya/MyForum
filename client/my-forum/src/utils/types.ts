// Некоторые типы/интерфейсы, которые использовались глобально в нескольких компонетах/контейнерах

// Тип для параметров роутинга
export type TMatchParams = {
  id: string;
};

// Тип для данных вопроса
export type TQuestionParameters = {
  id?: number;
  questionId: string;
  title: string;
  tags: string[];
  creationDate: number;
  popularityIndex: number;
  pictureUrl?: string[];
  explanation?: string;
};

// Тип для данных запроса(использовался в функциях запросов в файле features.ts)
export interface IRequestData<T> {
  url: string;
  values: T;
  callBack?(data?: any): void;
  contentType?: string;
}

// Тип информации для авторизации
export type TAuthorize = {
  email: string;
  password: string;
  passwordRepeat: string;
};
