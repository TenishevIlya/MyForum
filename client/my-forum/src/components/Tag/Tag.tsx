import React from "react";
import { Tag as AntTag } from "antd";
import { ITagProps } from "./Tag.types";

const Tag: React.FC<ITagProps> = ({ text, ...rest }: ITagProps) => {
  return <AntTag {...rest}>{text}</AntTag>;
};

export default Tag;
