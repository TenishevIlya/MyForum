import { FC, useState, useRef } from "react";
import { Input, Row, Col, Form, Switch, message } from "antd";
import { Avatar } from "../../components/Avatar/Avatar";
import { IUserProfileProps } from "./UserProfile.types";
import { store } from "../../store/store";
import Button from "../../components/Button/Button";
import { logInUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import { isEmpty, isNull, isUndefined } from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const { Password } = Input;

const UserProfile: FC<IUserProfileProps> = () => {
  const [isFormDisabled, setFormDisabled] = useState(true);
  const [deletePicture, setPictureDelete] = useState(false);
  const [userAvatar, setUserAvatar] = useState(
    !isEmpty(store.getState().personReducer.avatar_url)
      ? store.getState().personReducer.avatar_url[0]
      : undefined,
  );
  const { email, password, name } = store.getState().personReducer;
  const dispatch = useDispatch();
  const imageRef = useRef() as any;
  const history = useHistory();

  const successMessageOnUpdate = () => {
    message.success("Информация изменена");
  };

  const errorMessageOnUpdate = () => {
    message.error("Ошибка при изменении информации");
  };

  const [form] = Form.useForm();

  const handleDisableForm = () => {
    setFormDisabled(!isFormDisabled);
  };

  const handleUserDataUpdate = () => {
    const putData = { ...form.getFieldsValue() };
    const formData = new FormData();
    const input = document.getElementById("image") as any;

    for (let i = 0; i < input.files.length; i++) {
      formData.append("inputFiles", input.files[i]);
    }
    if (userAvatar === undefined && input.files.length > 0) {
      formData.append("shouldUpdate", "true");
    }
    if (userAvatar !== undefined && input.files.length > 0) {
      formData.append("shouldUpdate", "true");
    }
    if (
      userAvatar !== undefined &&
      input.files.length === 0 &&
      !deletePicture
    ) {
      formData.append("shouldUpdate", "false");
    }
    if (input.files.length === 0 && deletePicture) {
      formData.append("shouldUpdate", "true");
    }
    form.validateFields().then(() => {
      fetch(
        `http://localhost:4000/user/update/${
          store.getState().personReducer.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putData),
          cache: "reload",
        },
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(logInUser(data));
          setFormDisabled(true);
          successMessageOnUpdate();
        })
        .catch((err) => errorMessageOnUpdate());

      fetch(
        `http://localhost:4000/user/updateImage/${
          store.getState().personReducer.id
        }`,
        {
          method: "POST",
          body: formData,
        },
      )
        .catch((err) => {
          return err;
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPictureDelete(false);
          dispatch(logInUser(data));
          history.push("/");
        })
        .catch((err) => errorMessageOnUpdate());
    });
  };

  store.subscribe(() => {
    const userAvatar =
      isUndefined(store.getState().personReducer.avatar_url) ||
      isNull(store.getState().personReducer.avatar_url)
        ? undefined
        : store.getState().personReducer.avatar_url[0];
    setUserAvatar(userAvatar);
  });

  const getAvatarPath = () => {
    return !isEmpty(userAvatar) && !deletePicture ? userAvatar : undefined;
  };

  return (
    <Row gutter={16}>
      <Col>
        <Avatar size={120} src={getAvatarPath()} />
        <DeleteOutlined
          style={{
            height: "30px",
            width: "30px",
            cursor: "pointer",
            display: isFormDisabled ? "none" : "",
          }}
          onClick={() => setPictureDelete(true)}
        />
        <Form
          layout={"vertical"}
          style={{ marginTop: "16px" }}
          form={form}
          initialValues={{
            email: email,
            password: password,
            name: name,
          }}
        >
          <Form.Item name={"avatar"} style={{ marginBottom: "-15px" }}>
            <input
              id={"image"}
              ref={imageRef}
              type="file"
              name="answerImage"
              multiple
              style={{ marginBottom: "25px" }}
              disabled={isFormDisabled}
            />
          </Form.Item>
          <Form.Item
            label={"Электронная почта"}
            name={"email"}
            rules={[
              {
                type: "email",
                required: true,
                message: "Некорректный формат электронной почты",
              },
            ]}
          >
            <Input defaultValue={email} disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item label={"Имя"} name={"name"}>
            <Input defaultValue={name} disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item label={"Пароль"} name={"password"}>
            <Password defaultValue={password} disabled={isFormDisabled} />
          </Form.Item>
        </Form>
        <Form.Item label={"Редактирование"}>
          <Switch onChange={handleDisableForm} checked={!isFormDisabled} />
        </Form.Item>
        <Button
          text={"Сохранить"}
          type={"primary"}
          disabled={isFormDisabled}
          onClick={handleUserDataUpdate}
        />
      </Col>
    </Row>
  );
};

export default UserProfile;
