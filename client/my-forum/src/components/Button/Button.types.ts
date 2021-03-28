import { BaseButtonProps, NativeButtonProps } from "antd/lib/button/button";

export interface IButtonProps
  extends Partial<{
      text: string;
    }>,
    BaseButtonProps,
    NativeButtonProps {}
