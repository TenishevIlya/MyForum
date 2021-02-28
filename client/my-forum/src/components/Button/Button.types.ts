import { BaseButtonProps } from "antd/lib/button/button";

export interface IButtonProps
  extends Partial<{
      text: string;
    }>,
    BaseButtonProps {}
