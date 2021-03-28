import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { preparedQuestionData } from "./src/features.js";
import multer from "multer";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const Connection = mysql
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
  Connection.query(`SELECT * FROM questions`).then((result) => {
    console.log(result[0]);
    const models = result[0].map((row) => {
      return preparedQuestionData(row);
    });

    res.status(200).json(models);
  });
});

app.get("/question/:id", (req, res) => {
  Connection.query(`SELECT * FROM questions WHERE id=${req.params.id}`).then(
    (result) => {
      res.status(200).json(preparedQuestionData(result[0][0]));
    },
  );
});

app.post("/addQuestion", (req, res) => {
  const {
    title,
    tags,
    creationDate,
    status,
    popularityIndex,
    explanation,
    pictures,
  } = req.body;

  Connection.query(
    `INSERT INTO questions(title, tags, popularity_index, creation_date, status, explanation) VALUES ("${title}", "${tags.join()}", ${popularityIndex}, ${creationDate}, "${status}", "${explanation}")`,
  ).then((result) => {
    res.status(201).json(result);
  });
});

app.listen(process.env.PORT, () => console.log("Server is running"));
