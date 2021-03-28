import type { IRequestData } from "./utils/types";

// функция для генерации POST-запросов
export const createPostRequest = (requestData: IRequestData) => {
  const { url, values } = requestData;

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((err) => err)
    .then((res) => {
      return res.json();
    });
};

// функция для создания уникальных ключей компонентов
export const keyGenerator = (index: number, param: any) => `${index}_${param}`;

export const timestampToMilliseconds = (timestampInSeconds: number) =>
  timestampInSeconds * 1000;
