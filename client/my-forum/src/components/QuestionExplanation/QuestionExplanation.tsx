import type { FC } from "react";
import type { IQuestionExplanationProps } from "./QuestionExplanation.types";

const emptyExplanationMessage =
  "К данному вопросу не было добавлено объяснения.";

const QuestionExplanation: FC<IQuestionExplanationProps> = ({
  explanationText,
}: IQuestionExplanationProps) => {
  return <span>{explanationText ?? emptyExplanationMessage}</span>;
};

export default QuestionExplanation;
