import React, { useMemo, useState, useCallback, useRef } from "react";
import Button from "../../components/Button/Button";
import { Form, Modal, Input, Drawer, message } from "antd";
import { createPostRequest, createGetRequest } from "../../features";
import "./LogInPanel.styles.css";
import type { TAuthorize } from "../../utils/types";
import { useDispatch } from "react-redux";
import { logInUser, logOffUser } from "../../store/actions";
import { store } from "../../store/store";
import { eq, isUndefined } from "lodash";
import { Avatar } from "../../components/Avatar/Avatar";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Password } = Input;
const { confirm } = Modal;

const ComponentKeys = {
  form: "logInForm",
};

const FormLabels = {
  email: "Адрес электронной почты",
  name: "Имя",
  password: "Пароль",
  passwordRepeat: "Повторите пароль",
};

const FormItemsNames = {
  email: "email",
  name: "name",
  password: "password",
  passwordRepeat: "passwordRepeat",
};

const LogInPanel: React.FC = () => {
  const [isModalOpened, setModalOpened] = useState(false);
  const [isDrawerOpened, setDrawerOpened] = useState(false);
  const [isUserAuthorized, setUserAuthorized] = useState(false);
  const [isFormFailed, setFormFailed] = useState(false);
  const modalFormRef = useRef({} as any);
  const drawerFormRef = useRef({} as any);
  const dispatch = useDispatch();
  const history = useHistory();
  const [authForm] = Form.useForm();
  const [registrateForm] = Form.useForm();

  const successMessageOnLogIn = () => {
    message.success("Вы успешно зашли в свой профиль");
  };

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
            if (!isUndefined(store.getState().personReducer[0])) {
              successMessageOnLogIn();
            }
          });
        }
      });
  };

  const setUser = (data: any) => dispatch(logInUser(data));
  const unSetUser = () => {
    dispatch(logOffUser());
    setFormFailed(false);
  };

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
            }
          });
        }
      });
  };

  const handleModal = useCallback(() => {
    setModalOpened(!isModalOpened);
    setFormFailed(false);
    authForm.resetFields();
  }, [isModalOpened, authForm]);

  const handleDrawer = useCallback(() => {
    setDrawerOpened(!isDrawerOpened);
    setModalOpened(false);
    registrateForm.resetFields();
  }, [isDrawerOpened]);

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
            placeholder={"Введите логин"}
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
          <Password
            placeholder={"Введите пароль"}
            onChange={() => setFormFailed(false)}
          />
        </Form.Item>
        <Form.Item
          label={FormLabels.passwordRepeat}
          name={FormItemsNames.passwordRepeat}
          rules={[{ required: true, message: "Поле обязательно к заполнению" }]}
        >
          <Password
            placeholder={"Повторите пароль"}
            onChange={() => setFormFailed(false)}
          />
        </Form.Item>
        {isFormFailed && (
          <span className={"failed-form-message-styles"}>
            {"Пользователь с таким email уже существует"}
          </span>
        )}
      </Form>
    );
  }, [isFormFailed]);

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
          {isFormFailed && (
            <span className={"failed-form-message-styles"}>
              {"Неверный логин или пароль"}
            </span>
          )}
        </Form>
      </Modal>
    );
  }, [isModalOpened, handleModal, renderModalFooter, isFormFailed]);

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

  return isUserAuthorized ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div onClick={linkToProfile} className={"avatar-styles"}>
        <Avatar />
      </div>
      <Button text={"Выйти"} onClick={showConfirm} />
    </div>
  ) : (
    <>
      <Button key="btn" text={"Войти"} onClick={handleModal} />
      {renderModal}
      {renderDrawer}
    </>
  );
};

export default LogInPanel;
