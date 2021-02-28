import React from "react";
import { Form, Input } from "antd";
import Button from "../../components/Button/Button";

class Authorization extends React.PureComponent {
  render() {
    return (
      <Form>
        <Button text={"Войти"} />
      </Form>
    );
  }
}

export default Authorization;
