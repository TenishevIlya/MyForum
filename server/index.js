import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { preparedQuestionData, preparedAnswerData } from "./src/features.js";
import multer from "multer";
import path from "path";
import { authorize, registrate } from "./src/authorization.js";
import fileUpload from "express-fileupload";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});

const __dirname = path.resolve();

dotenv.config();

const app = express();

let questionImageFileUrl;
let questionAddData;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
// app.use(fileUpload());
// app.use(multer({ dest: "src/images" }));

var upload = multer({ storage: storage });

export const Connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

Connection.connect((err) => {
  if (err) {
    return err;
  }
});

app.get("/", (req, res) => {
  Connection.query(
    `SELECT * FROM questions ORDER BY questions.popularity_index DESC`,
  ).then((result) => {
    const models = result[0].map((row) => {
      return preparedQuestionData(row);
    });

    res.status(200).json(models);
  });
});

app.get("/question/:id", (req, res) => {
  Connection.query(`SELECT * FROM questions WHERE id=${req.params.id}`).then(
    (result) => {
      res.status(200).json(preparedQuestionData(result[0][0], __dirname));
    },
  );
});

app.get("/question/answers/:id", (req, res) => {
  Connection.query(
    `SELECT answers.id, answers.question_id, answers.explanation, answers.picture_url, answers.answer_author_id, answers.creation_date, users.id, users.email FROM answers INNER JOIN users ON answers.answer_author_id=users.id WHERE question_id=${req.params.id}`,
  ).then((result) => {
    // console.log(preparedAnswerData(result[0], __dirname));
    res.status(200).json(preparedAnswerData(result[0], __dirname));
  });
});

app.post("/addQuestionImage/:id", upload.any(), (req, res) => {
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
});

app.post("/addQuestion", (req, res) => {
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
});

app.post("/addAnswerImage/:answerUUID", upload.any(), (req, res) => {
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
});

app.post("/addAnswer", upload.any(), (req, res) => {
  const {
    answerExplanation,
    questionId,
    creationDate,
    userId,
    answerUUID,
  } = req.body;

  Connection.query(
    `INSERT INTO answers(question_id, explanation, answer_author_id, creation_date, answer_uuid) VALUES ("${questionId}", "${answerExplanation}", ${userId}, "${creationDate}", "${answerUUID}")`,
  ).then((result) => {
    res.status(201).json(result);
  });
});

app.put("/question/updatePopularity/:id", (req, res) => {
  Connection.query(
    `UPDATE questions SET popularity_index=popularity_index+1 WHERE id=${req.params.id}`,
  ).then((result) => {
    res.status(200).json(result[0]);
  });
});

app.post("/registrate", registrate);
app.get("/authorize", authorize);

app.listen(process.env.PORT, () => console.log("Server is running"));
