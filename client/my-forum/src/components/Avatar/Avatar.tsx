import { FC } from "react";
import { Avatar as AntAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AvatarProps } from "antd/lib/avatar/index";

// Интерфейс props компонента
export interface IAvatarProps extends AvatarProps {}

// Компонент-обёртка для аватаров
export const Avatar: FC<IAvatarProps> = ({ size, ...rest }: IAvatarProps) => {
  return <AntAvatar icon={<UserOutlined />} size={size} {...rest} />;
};
