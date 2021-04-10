import { Connection } from "../index.js";
import { picturesPathMapper } from "./features.js";

export const authorize = (req, res) => {
  const { email, password } = req.headers;

  Connection.query(
    `SELECT * FROM users WHERE email="${email}" AND password="${password}"`,
  ).then((result) => {
    res.status(201).json(
      /**
       * Здесь идет проверка на то, есть ли пользователь в бд, и если есть - отправляем данные,
       * в противном случае - шлём пустой массив
       */
      result[0].length === 0
        ? []
        : {
            ...result[0][0],
            avatar_url:
              result[0].length === 0
                ? null
                : picturesPathMapper(result[0][0].avatar_url),
          },
    );
  });
};

export const registrate = (req, res) => {
  const { email, password, name } = req.body;

  /**
   * Сначала делаем запрос на проверку наличия пользователя в бд
   */
  Connection.query(`SELECT * FROM users WHERE email="${email}"`).then(
    (result) => {
      /**
       * Если пользователя нет, то добавляем его, если есть - отправляем ошибку
       */
      if (result[0].length === 0) {
        Connection.query(
          `INSERT INTO users(email, password, name) VALUES ("${email}", "${password}", "${name}")`,
        ).then((queryRes) => {
          res.status(201).json(queryRes);
        });
      } else {
        res.status(500).json({ notUniq: true });
      }
    },
  );
};
