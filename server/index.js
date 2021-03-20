import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

const Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

Connection.connect((err) => {
  if (err) {
    return err;
  }
});

app.listen(process.env.PORT, () => console.log("Server is running"));
