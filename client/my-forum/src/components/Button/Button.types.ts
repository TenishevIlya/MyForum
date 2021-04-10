import { BaseButtonProps, NativeButtonProps } from "antd/lib/button/button";

/**
 * Интерфейс props компонента
 * (Partial означает, что вс пропс внтури него будут опциональными, более детально есть в документации TypeScript)
 */
export interface IButtonProps
  extends Partial<{
      text: string;
    }>,
    BaseButtonProps,
    NativeButtonProps {}
