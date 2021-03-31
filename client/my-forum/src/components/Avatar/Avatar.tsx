import { FC } from "react";
import { Avatar as AntAvatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AvatarProps } from "antd/lib/avatar/index";

export interface IAvatarProps extends AvatarProps {}

export const Avatar: FC<IAvatarProps> = ({ size }: IAvatarProps) => {
  return <AntAvatar icon={<UserOutlined />} size={size} />;
};
