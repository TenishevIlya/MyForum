import { FC, useState, useRef } from "react";
import { Input, Row, Col, Form, Switch, message } from "antd";
import { Avatar } from "../../components/Avatar/Avatar";
import { store } from "../../store/store";
import Button from "../../components/Button/Button";
import { logInUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import { isEmpty, isNull, isUndefined } from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const { Password } = Input;

// Контейнер профиля пользователя
const UserProfile: FC = () => {
  const [isFormDisabled, setFormDisabled] = useState(true);

  // state, отвечающий за то, будет ли при отправке удаляться аватар
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

  // Экземпляр форм, благодаря которому реализуем контроль над формой
  const [form] = Form.useForm();

  // Обработчик выключенного состояния формы(т.е. когда все поля заблокированны)
  const handleDisableForm = () => {
    setFormDisabled(!isFormDisabled);
  };

  // Обработчик обновления информации
  const handleUserDataUpdate = () => {
    const putData = { ...form.getFieldsValue() };
    const formData = new FormData();
    const input = document.getElementById("image") as any;

    /**
     * По части обработки изменения и сброса аватара - логика такая же, как и в QuestionPage и AddQuestionForm
     */

    for (let i = 0; i < input.files.length; i++) {
      formData.append("inputFiles", input.files[i]);
    }

    /**
     * В условиях добавляем дополнительное поле в formData, которое будет описывать, нужно ли нам обновлять аватар
     */
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

    // После валтдации формы делаем запрос на апдейт текстовой информации и информации по аваатару
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

  /**
   * Подписка на глобальные стор, чтобы отслеживать информацию по наличию аватара
   * В зависимости от этого производим отображение  аватара в профиле
   */
  store.subscribe(() => {
    const userAvatar =
      isUndefined(store.getState().personReducer.avatar_url) ||
      isNull(store.getState().personReducer.avatar_url)
        ? undefined
        : store.getState().personReducer.avatar_url[0];
    setUserAvatar(userAvatar);
  });

  // Получение пути к аватару
  const getAvatarPath = () => {
    return !isEmpty(userAvatar) && !deletePicture ? userAvatar : undefined;
  };

  /**
   * Отрисовка формы со всеми полями
   * В режиме "отключено" нельзя производить никаких изменений
   * Если нужно сделать изменения, то нажимаем на свитчер(компонент с 203 по 205 строку)
   * После этого поля разблокируются и можно менять информацию
   * Удаление аватара происходит по нажатию на иконку справа от него
   */
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
          disabled={isFormDisabled}
          onClick={handleUserDataUpdate}
        />
      </Col>
    </Row>
  );
};

export default UserProfile;
