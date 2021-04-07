import type { IRequestData } from "./utils/types";

// функция для генерации POST-запросов
export const createPostRequest = <T>(requestData: IRequestData<T>) => {
  const { url, values, contentType = "application/json" } = requestData;

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": `${contentType}`,
      // "Content-Type": "multipart/form-data; boundary=asdasasd",
    },
  })
    .catch((err) => err)
    .then((res) => {
      return res.json();
    });
};

export const createGetRequest = <T>(requestData: IRequestData<T>) => {
  const { url, values, callBack } = requestData;

  return fetch(url, {
    headers: { ...values } as any,
  })
    .catch((err) => err)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      callBack && callBack(data);
    });
};

// функция для создания уникальных ключей компонентов
export const keyGenerator = (index: number, param: any) => `${index}_${param}`;

export const timestampToMilliseconds = (timestampInSeconds: number) =>
  timestampInSeconds * 1000;
