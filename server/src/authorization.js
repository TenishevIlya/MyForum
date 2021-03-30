import { Connection } from "../index.js";

export const authorize = (req, res) => {
  const { email, password } = req.headers;

  Connection.query(
    `SELECT * FROM users WHERE email="${email}" AND password="${password}"`,
  ).then((result) => {
    res.status(201).json(result[0]);
  });
};

export const registrate = (req, res) => {
  const { email, password } = req.body;

  Connection.query(
    `INSERT INTO users(email, password) VALUES ("${email}", "${password}")`,
  ).then((result) => {
    res.status(201).json(result);
  });
};
