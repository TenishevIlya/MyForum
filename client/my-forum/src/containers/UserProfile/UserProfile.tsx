import { FC } from "react";
import { Input, Row, Col, Form } from "antd";
import { Avatar } from "../../components/Avatar/Avatar";
import { IUserProfileProps } from "./UserProfile.types";
import { store } from "../../store/store";

const { Password } = Input;

const UserProfile: FC<IUserProfileProps> = () => {
  const { email, password } = store.getState().personReducer[0];

  return (
    <Row gutter={16}>
      <Col>
        <Avatar size={120} />
        <Form layout={"vertical"} style={{ marginTop: "16px" }}>
          <Form.Item label={"Email"}>
            <Input value={email} disabled />
          </Form.Item>
          <Form.Item label={"Пароль"}>
            {" "}
            <Password value={password} disabled />
          </Form.Item>
        </Form>
      </Col>
      {/* <Col>
        <Form layout={"vertical"}>
          <Form.Item label={"Email"}>
            <Input value={email} disabled />
          </Form.Item>
          <Form.Item label={"Пароль"}>
            {" "}
            <Password value={password} disabled />
          </Form.Item>
        </Form>
      </Col> */}
    </Row>
  );
};

export default UserProfile;
