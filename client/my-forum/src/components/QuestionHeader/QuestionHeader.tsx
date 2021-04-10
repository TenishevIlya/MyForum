import type { FC } from "react";
import { IQuestionHeaderProps } from "./QuestionHeader.types";
import "./QuestionHeader.styles.css";
import moment from "moment";
import Button from "../../components/Button/Button";

moment.locale("ru");

// Компонент шапки вопроса
const QuestionHeader: FC<IQuestionHeaderProps> = ({
  title,
  creationDateTimestamp,
  timesViewed,
  addQuestionCallback,
}: IQuestionHeaderProps) => {
  // Получаем дату создания вопроса по миллисекундам
  var momentDateNow = moment(creationDateTimestamp);
  // Смотрим, сколько времени прошло с создания вопроса
  const creationDateFromNow = momentDateNow.fromNow();

  // Отрисовка
  return (
    <div className={"question-header-style"}>
      <div>
        <h2>{title}</h2>
        <ul className={"list-style"}>
          <li className={"list-item-style"}>
            <span>{"Дата создания вопроса: "}</span>
            <span className={"list-item-date-style"}>
              {creationDateFromNow}
            </span>
          </li>
          <li className={"list-item-style"}>
            <span>{"Просмотрен: "}</span>
            <span
              className={"list-item-date-style"}
            >{`${timesViewed} раз(-а)`}</span>
          </li>
        </ul>
      </div>
      <Button
        text={"Добавить ответ"}
        type={"primary"}
        onClick={addQuestionCallback}
      />
    </div>
  );
};

export default QuestionHeader;
