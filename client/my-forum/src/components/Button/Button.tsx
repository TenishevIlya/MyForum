import React from "react";
import { Button as AntButton } from "antd";
import { IButtonProps } from "./Button.types";
import "./Button.styles.css";

// Компонент-обёртка для кнопки
const Button: React.FC<IButtonProps> = ({ text, ...rest }: IButtonProps) => {
  return <AntButton {...rest}>{text}</AntButton>;
};

export default Button;
