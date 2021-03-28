import { FC } from "react";
import { Spin } from "antd";
import { ISpinnerProps } from "./Spinner.types";
import "./Spinner.styles.css";

const Spinner: FC<ISpinnerProps> = ({ size }: ISpinnerProps) => {
  return <Spin size={size} className={"spinner-style"} />;
};

export default Spinner;
