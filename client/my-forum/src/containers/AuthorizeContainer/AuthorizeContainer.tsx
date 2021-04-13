import React, { useMemo, useState, useCallback, useRef } from "react";
import Button from "../../components/Button/Button";
import { Form, Modal, Input, Drawer, message } from "antd";
import { createPostRequest, createGetRequest } from "../../features";
import "./AuthorizeContainer.styles.css";
import type { TAuthorize } from "../../utils/types";
import { useDispatch } from "react-redux";
import { logInUser, logOffUser } from "../../store/actions";
import { store } from "../../store/store";
import { eq, isEmpty } from "lodash";
import { Avatar } from "../../components/Avatar/Avatar";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Password } = Input;
const { confirm } = Modal;

const ComponentKeys = {
  form: "logInForm",
};

// Названия полей формы
const FormLabels = {
  email: "Адрес электронной почты",
  name: "Имя",
  password: "Пароль",
  passwordRepeat: "Повторите пароль",
};

// Имена полей формы, необходимые для дальнейшей работы с данными при отправке на сервер
const FormItemsNames = {
  email: "email",
  name: "name",
  password: "password",
  passwordRepeat: "passwordRepeat",
};

const AuthorizeContainer: React.FC = () => {
  /**
   * state, отвечающий за открытие/закрытие модалки
   */
  const [isModalOpened, setModalOpened] = useState(false);
  /**
   * state, отвечающий за открытие/закрытие выезжающего компонента
   */
  const [isDrawerOpened, setDrawerOpened] = useState(false);
  /**
   * state, отвечающий за то, чтобы отмечалось то, что пользователь залогинился/разлогинился
   */
  const [isUserAuthorized, setUserAuthorized] = useState(false);
  /**
   * state, отвечающий за то, чтобы производились действий в случае ошибки
   * т.е. выделение красным, соответсвующие сообщения и т.д.
   */
  const [isFormFailed, setFormFailed] = useState(false);

  // рефы для доступа к формам в модалке и выезжающем компоненте
  const modalFormRef = useRef({} as any);
  const drawerFormRef = useRef({} as any);

  // инициализация функции отправки действия
  const dispatch = useDispatch();
  // инициализация объекта для работы с роутингом
  const history = useHistory();

  // Экземпляры форм, благодаря которым реализуем сборс и валидацию форм, и весь остальной контроль над формой
  const [authForm] = Form.useForm();
  const [registrateForm] = Form.useForm();

  // Сообщение об удачной авторизации
  const successMessageOnLogIn = () => {
    message.success("Вы успешно зашли в свой профиль");
  };

  // Сообщение о неудачной авторизации
  const errorMessageOnLogIn = () => {
    message.success("Ошибка входа в профиль");
  };

  // Сообщение об удачной регистрации
  const successMessageOnRegistrate = () => {
    message.success("Пользователь создан");
  };

  // Сообщение о неудачной регистрации
  const errorMessageOnRegistrate = () => {
    message.success("Ошибка регистрации");
  };

  // функция-обработчик submit'a формы авторизации
  const handleModalSubmit = () => {
    authForm
      .validateFields()
      .catch((err) => err)
      .then((err) => {
        if (!err.errorFields) {
          createGetRequest<TAuthorize>({
            url: "http://localhost:4000/authorize",
            values: modalFormRef.current.getFieldsValue(),
            callBack: setUser,
          }).then(() => {
            if (!isEmpty(store.getState().personReducer)) {
              successMessageOnLogIn();
            }
          });
        }
      })
      .catch(() => errorMessageOnLogIn());
  };

  // функция записывающая данные в глобальный стор
  const setUser = (data: any) => dispatch(logInUser(data));

  // функция очищающая данные в глобальном сторе
  const unSetUser = () => {
    dispatch(logOffUser());
    setFormFailed(false);
    history.location.pathname === "/user" && history.push("/");
  };

  // функция-обработчик submit'a формы регистрации
  const handleDrawerSubmit = () => {
    registrateForm
      .validateFields()
      .catch((err) => {
        return err;
      })
      .then((err) => {
        if (!err.errorFields) {
          createPostRequest({
            url: "http://localhost:4000/registrate",
            values: drawerFormRef.current.getFieldsValue(),
          }).then((res) => {
            if (eq(res.notUniq, true)) {
              setFormFailed(true);
            } else {
              registrateForm.resetFields();
              setFormFailed(false);
              handleDrawer();
              successMessageOnRegistrate();
            }
          });
        }
      })
      .catch(() => errorMessageOnRegistrate());
  };

  // обработка действий при закрытии модального окна
  const handleModal = useCallback(() => {
    setModalOpened(!isModalOpened);
    setFormFailed(false);
    authForm.resetFields();
  }, [isModalOpened, authForm]);

  // обработка действий при закрытии выезжающего компонента
  const handleDrawer = useCallback(() => {
    setDrawerOpened(!isDrawerOpened);
    setModalOpened(false);
    registrateForm.resetFields();
  }, [isDrawerOpened]);

  // форма выезжающего компонента
  const drawerForm = useCallback(() => {
    return (
      <Form
        key={ComponentKeys.form}
        name={ComponentKeys.form}
        ref={drawerFormRef}
        layout={"vertical"}
        form={registrateForm}
      >
        <Form.Item
          label={FormLabels.email}
          name={FormItemsNames.email}
          rules={[
            {
              type: "email",
              required: true,
              message: "Некорректный формат электронной почты",
            },
          ]}
        >
          <Input
            placeholder={"Введите адрес электронной почты"}
            onChange={() => setFormFailed(false)}
          />
        </Form.Item>
        <Form.Item
          label={FormLabels.name}
          name={FormItemsNames.name}
          rules={[
            {
              required: true,
              message: "Поле обязательно к заполнению",
            },
          ]}
        >
          <Input
            placeholder={"Введите имя"}
            onChange={() => setFormFailed(false)}
          />
        </Form.Item>
        <Form.Item
          label={FormLabels.password}
          name={FormItemsNames.password}
          rules={[
            {
              required: true,
              message: "Поле обязательно к заполнению",
            },
          ]}
          hasFeedback
        >
          <Password
            placeholder={"Введите пароль"}
            onChange={() => setFormFailed(false)}
          />
        </Form.Item>
        <Form.Item
          label={FormLabels.passwordRepeat}
          name={FormItemsNames.passwordRepeat}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Поле обязательно к заполнению",
            },
            // функция для проверка совпадения паролей
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password placeholder={"Повторите пароль"} />
        </Form.Item>
        {/*Сообщение, появляющееся при попытке регистрации с уже имеющимся email'ом*/}
        {isFormFailed && (
          <span className={"failed-form-message-styles"}>
            {"Пользователь с таким email уже существует"}
          </span>
        )}
      </Form>
    );
  }, [isFormFailed]);

  // нижняя часть выезжающего компонента
  const renderDrawerFooter = useMemo(() => {
    return (
      <div className={"drawer-footer-styles"}>
        <Button
          text={"Отмена"}
          style={{ marginRight: "10px" }}
          onClick={handleDrawer}
        />
        <Button
          type={"primary"}
          text={"Отправить"}
          onClick={handleDrawerSubmit}
        />
      </div>
    );
  }, [handleDrawer]);

  // нижняя часть модального окна
  const renderModalFooter = useMemo(() => {
    return (
      <div className={"modal-footer-style"}>
        <span>
          Еще нет аккаунта?{" "}
          <span className={"create-account-text"} onClick={handleDrawer}>
            Создайте его!
          </span>
        </span>
        <Button
          type={"primary"}
          text={"Войти"}
          onClick={handleModalSubmit}
        ></Button>
      </div>
    );
  }, [handleDrawer]);

  // фнкция, отрисовывающая выезжающий компонент
  const renderDrawer = useMemo(() => {
    return (
      <Drawer
        visible={isDrawerOpened}
        title={"Зарегистрируйтесь прямо сейчас"}
        placement="right"
        onClose={handleDrawer}
        width={400}
        footer={renderDrawerFooter}
      >
        {drawerForm()}
      </Drawer>
    );
  }, [isDrawerOpened, handleDrawer, drawerForm, renderDrawerFooter]);

  // фнкция, отрисовывающая модальное окно
  const renderModal = useMemo(() => {
    return (
      <Modal
        title={"Введите ваши данные"}
        visible={isModalOpened}
        onCancel={handleModal}
        okText={"Войти"}
        cancelText={"Отменить"}
        footer={renderModalFooter}
      >
        <Form
          key={ComponentKeys.form}
          name={ComponentKeys.form}
          ref={modalFormRef}
          layout={"vertical"}
          form={authForm}
        >
          <Form.Item
            label={FormLabels.email}
            name={FormItemsNames.email}
            validateStatus={isFormFailed ? "error" : undefined}
            rules={[
              {
                type: "email",
                required: true,
                message: "Некорректный формат электронной почты",
              },
            ]}
          >
            <Input
              placeholder={"Введите логин"}
              onChange={() => setFormFailed(false)}
            />
          </Form.Item>
          <Form.Item
            label={FormLabels.password}
            name={FormItemsNames.password}
            validateStatus={isFormFailed ? "error" : undefined}
            rules={[
              {
                required: true,
                message: "Поле обязательно к заполнению",
              },
            ]}
          >
            <Password
              placeholder={"Введите пароль"}
              onChange={() => setFormFailed(false)}
            />
          </Form.Item>
          {/*Сообщение, появляющееся при попытке авторизации с неправильными данными*/}
          {isFormFailed && (
            <span className={"failed-form-message-styles"}>
              {"Неверный логин или пароль"}
            </span>
          )}
        </Form>
      </Modal>
    );
  }, [isModalOpened, handleModal, renderModalFooter, isFormFailed]);

  /**
   * Подписка на глобальный стор, чтобы отслеживать его изменения
   * В зависимости от этого сбрасываем или активируем авторизацию и работу модального окна и формы
   */
  store.subscribe(() => {
    if (!eq(store.getState().personReducer.length, 0)) {
      setUserAuthorized(true);
      handleModal();
    } else {
      setFormFailed(true);
      setUserAuthorized(false);
    }
  });

  const linkToProfile = () => history.push("/user");

  // Подтверждение для удаления
  const showConfirm = () => {
    return confirm({
      title: "Вы действительно хотите выйти из профиля?",
      icon: <ExclamationCircleOutlined />,
      okText: "Да",
      cancelText: "Отмена",
      onOk() {
        unSetUser();
      },
    });
  };

  // Получениие пути для аватара
  const getAvatarPath = () => {
    return !isEmpty(store.getState().personReducer.avatar_url[0])
      ? store.getState().personReducer.avatar_url[0]
      : undefined;
  };

  /**
   * Отрисовка в зависимости от того, авторизован пользователь или нет
   * Если да - то будет автар и кнопка "Выйти"
   * Если нет - только кнопка "Войти"
   */
  return isUserAuthorized ? (
    <div
      key={"authorizedInfo"}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div
        key={"avatarContainer"}
        onClick={linkToProfile}
        className={"avatar-styles"}
      >
        <Avatar key={"avatar"} src={getAvatarPath()} />
      </div>
      <Button key={"logOffBtn"} text={"Выйти"} onClick={showConfirm} />
    </div>
  ) : (
    <>
      <Button key="logInBtn" text={"Войти"} onClick={handleModal} />
      {renderModal}
      {renderDrawer}
    </>
  );
};

export default AuthorizeContainer;
