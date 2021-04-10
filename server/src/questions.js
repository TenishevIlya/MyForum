import { Connection } from "../index.js";
import {
  preparedQuestionData,
  getLimit,
  preparedAnswerData,
} from "./features.js";

export const getQuestions = (req, res) => {
  const { limit } = req.headers;
  Connection.query(
    `SELECT * FROM questions ORDER BY questions.popularity_index DESC ${getLimit(
      limit,
    )}`,
  ).then((result) => {
    const models = result[0].map((row) => {
      return preparedQuestionData(row);
    });

    res.status(200).json(models);
  });
};

export const getQuestionById = (req, res) => {
  Connection.query(`SELECT * FROM questions WHERE id=${req.params.id}`).then(
    (result) => {
      res.status(200).json(preparedQuestionData(result[0][0]));
    },
  );
};

export const getQuestionAnswers = (req, res) => {
  Connection.query(
    `SELECT answers.id, answers.question_id, answers.explanation, answers.picture_url, answers.answer_author_id, answers.creation_date, users.id, users.email, users.name, users.avatar_url FROM answers INNER JOIN users ON answers.answer_author_id=users.id WHERE question_id=${req.params.id}`,
  ).then((result) => {
    res.status(200).json(preparedAnswerData(result[0]));
  });
};

export const addQuestion = (req, res) => {
  const {
    title,
    tags,
    creationDate,
    status,
    popularityIndex,
    explanation,
    questionId,
  } = req.body;

  Connection.query(
    `INSERT INTO questions(question_id, title, tags, popularity_index, creation_date, status, explanation) VALUES ("${questionId}", "${title}", "${tags.join()}", ${popularityIndex}, ${creationDate}, "${status}", "${explanation}")`,
  ).then((result) => {
    res.status(201).json(result);
  });
};

export const addQuestionImage = (req, res) => {
  /**
   * Форматируем данные для более удобной работы с ними в дальнейшем
   */
  const filesPath = req.files.map((file) => {
    return file.path.split("\\").join(`/`);
  });

  Connection.query(
    `UPDATE questions SET picture_url="${filesPath.join(
      ",",
    )}" WHERE question_id="${req.params.id}"`,
  ).then((result) => {
    res.status(201).json(result[0]);
  });
};

/**
 * Увеличиваем информацию о количестве просмотров вопроса с каждым запросом на данные вопроса
 */
export const updatePopularity = (req, res) => {
  Connection.query(
    `UPDATE questions SET popularity_index=popularity_index+1 WHERE id=${req.params.id}`,
  ).then((result) => {
    res.status(200).json(result[0]);
  });
};
