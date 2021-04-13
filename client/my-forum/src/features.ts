import type { IRequestData } from "./utils/types";

/**
 * Функции для запросов не получилось сделать максимально универсальными,
 * т.к. были места со своими подводными камнями и там приходилось использовать fetch без вызова функции-обертки
 */

/**
 * Функция-обёртка для генерации POST-запросов
 */
export const createPostRequest = <T>(requestData: IRequestData<T>) => {
  const { url, values, contentType = "application/json" } = requestData;

  return fetch(url, {
    method: "POST",
    // Парсинг даты из json-формата в строку
    body: JSON.stringify(values),
    headers: {
      "Content-Type": `${contentType}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err);
};

/**
 * Функция-обёртка для генерации GET-запросов
 */
export const createGetRequest = <T>(requestData: IRequestData<T>) => {
  const { url, values, callBack } = requestData;

  return fetch(url, {
    headers: { ...values } as any,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err)
    .then((data) => {
      // Функция, которая будет вызвана после того, как отработает запрос
      callBack && callBack(data);
    });
};

// функция для создания уникальных ключей компонентов
export const keyGenerator = (index: number, param: any) => `${index}_${param}`;

// Перевод дат из секунд в миллисекунды
export const timestampToMilliseconds = (timestampInSeconds: number) =>
  timestampInSeconds * 1000;
