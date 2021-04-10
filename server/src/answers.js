import { Connection } from "../index.js";

export const addAnswer = (req, res) => {
  const {
    answerExplanation,
    questionId,
    creationDate,
    userId,
    answerUUID,
  } = req.body;

  Connection.query(
    `INSERT INTO answers(question_id, explanation, answer_author_id, creation_date, answer_uuid) VALUES ("${questionId}", '${answerExplanation}', ${userId}, "${creationDate}", "${answerUUID}")`,
  ).then((result) => {
    res.status(201).json(result);
  });
};

export const addAnswerImage = (req, res) => {
  /**
   * Форматируем данные для более удобной работы с ними в дальнейшем
   */
  const filesPath = req.files.map((file) => {
    return file.path.split("\\").join(`/`);
  });

  Connection.query(
    `UPDATE answers SET picture_url="${filesPath.join(
      ",",
    )}" WHERE answer_uuid="${req.params.answerUUID}"`,
  ).then((result) => {
    res.status(201).json(result[0]);
  });
};
