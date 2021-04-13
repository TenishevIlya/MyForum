import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { authorize, registrate } from "./src/authorization.js";

import {
  getQuestions,
  getQuestionById,
  getQuestionAnswers,
  addQuestionImage,
  addQuestion,
  updatePopularity,
} from "./src/questions.js";
import { addAnswer, addAnswerImage } from "./src/answers.js";
import { updateUser, updateUserImage } from "./src/users.js";

/**
 * Объявление движка дискового пространства. Дает полный контроль над размещением файлов на диск.
 *
 * Доступно две опции, расположение destination и имя файла filename.
 * Обе эти функции определяют, где будет находиться файл после загрузки.
 *
 * destination используется, чтобы задать каталог, в котором будут размещены файлы. Может быть задан строкой (например, '/tmp/uploads').
 * Если не задано расположение destination, операционная система воспользуется для сохранения каталогом для временных файлов.
 *
 * filename используется, чтобы определить, как будет назван файл внутри каталога.
 * Если имя файла filename не задано, каждому файлу будет сконфигурировано случайное имя без расширения файла.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Конфигурация подключения глобальных переменных
dotenv.config();

// Создание объекта, который будет представляет приложение
const app = express();

const __dirname = path.resolve();

/**
 * Встраивание в конвейер обработки запроса на функцию middleware
 * (cors - пакет, предоставляющий возможность доступа к ресурсам другого домена)
 */
app.use(cors());
/**
 * Встраивание в конвейер обработки запроса на функцию middleware
 * (bodyParser - пакет для парсинга body запроса)
 */
app.use(bodyParser.json());

app.use(express.static(__dirname));

// Инициализация multer для работы с загрузкой файлов
var upload = multer({ storage: storage });

// Подключение к базе данных(в качестве параметров используются глобальные переменные из файла .env)
export const Connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

// Проверка на случай ошибки
Connection.connect((err) => {
  if (err) {
    return err;
  }
});

// Маршруты для работы с вопросами(get - на получение, post - на добавление данных)
app.get("/", getQuestions);
app.get("/question/:id", getQuestionById);
app.get("/question/answers/:id", getQuestionAnswers);
app.post("/addQuestionImage/:id", upload.any(), addQuestionImage);
app.post("/addQuestion", addQuestion);
app.put("/question/updatePopularity/:id", updatePopularity);

// Маршруты для работы с ответами(post - на добавление данных)
app.post("/addAnswer", upload.any(), addAnswer);
app.post("/addAnswerImage/:answerUUID", upload.any(), addAnswerImage);

// Маршруты для работы с пользователями(put - на апдейт данных, post - на добавление данных)
app.put("/user/update/:id", updateUser);
app.post("/user/updateImage/:id", upload.any(), updateUserImage);

// Маршруты для работы с авторизацией и регистрацией(get - на получение, post - на добавление данных)
app.get("/authorize", authorize);
app.post("/registrate", registrate);

// Запуск сервера
app.listen(process.env.PORT, () => console.log("Server is running"));
