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

  Connection.query(`SELECT * FROM users WHERE email="${email}"`).then(
    (result) => {
      if (result.length === 0) {
        Connection.query(
          `INSERT INTO users(email, password) VALUES ("${email}", "${password}")`,
        ).then((res) => {
          res.status(201).json(res);
        });
      }
      res.status(500).json({ notUniq: true });
    },
  );
};
