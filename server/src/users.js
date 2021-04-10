import { Connection } from "../index.js";
import { picturesPathMapper } from "./features.js";

export const updateUser = (req, res) => {
  const { email, password, name } = req.body;

  Connection.query(
    `UPDATE users SET email="${email}", password="${password}", name="${name}" WHERE id=${req.params.id}`,
  ).then((result) => {
    Connection.query(`SELECT * FROM users WHERE id=${req.params.id}`).then(
      (userRes) => {
        res.status(201).json({
          ...userRes[0][0],
          avatar_url: picturesPathMapper(userRes[0][0].avatar_url),
        });
      },
    );
  });
};

export const updateUserImage = (req, res) => {
  /**
   * Форматируем данные для более удобной работы с ними в дальнейшем
   */
  const filesPath = req.files.map((file) => {
    return file.path.split("\\").join(`/`);
  });

  /**
   * Проверка на то, надо ли проводить обновление данных,
   * если да - делаем апдейт и потом запрос на обновленные данные,
   * есди нет - просто делаем запрос на данные
   */
  if (req.body.shouldUpdate === "true") {
    Connection.query(
      `UPDATE users SET avatar_url="${filesPath.join(",")}" WHERE id=${
        req.params.id
      }`,
    ).then((result) => {
      Connection.query(`SELECT * FROM users WHERE id=${req.params.id}`).then(
        (userRes) => {
          res.status(201).json({
            ...userRes[0][0],
            avatar_url: picturesPathMapper(userRes[0][0].avatar_url),
          });
        },
      );
    });
  } else {
    Connection.query(`SELECT * FROM users WHERE id=${req.params.id}`).then(
      (userRes) => {
        res.status(201).json({
          ...userRes[0][0],
          avatar_url: picturesPathMapper(userRes[0][0].avatar_url),
        });
      },
    );
  }
};
