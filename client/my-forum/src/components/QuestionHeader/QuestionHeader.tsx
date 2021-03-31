import type { FC } from "react";
import { IQuestionHeaderProps } from "./QuestionHeader.types";
import "./QuestionHeader.styles.css";
import moment from "moment";

moment.locale("ru");

const QuestionHeader: FC<IQuestionHeaderProps> = ({
  title,
  creationDateTimestamp,
  timesViewed,
}: IQuestionHeaderProps) => {
  var momentNow = moment(creationDateTimestamp);
  const creationDateFromNow = momentNow.fromNow();

  return (
    <div className={"question-header-style"}>
      <h2>{title}</h2>
      <ul className={"list-style"}>
        <li className={"list-item-style"}>
          <span>{"Дата создания вопроса: "}</span>
          <span className={"list-item-date-style"}>{creationDateFromNow}</span>
        </li>
        <li className={"list-item-style"}>
          <span>{"Просмотрен: "}</span>
          <span
            className={"list-item-date-style"}
          >{`${timesViewed} раз(-а)`}</span>
        </li>
      </ul>
    </div>
  );
};

export default QuestionHeader;
