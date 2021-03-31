import React, { useMemo, useState, useCallback, useRef } from "react";
import Button from "../../components/Button/Button";
import { Form, Modal, Input, Drawer } from "antd";
import { createPostRequest, createGetRequest } from "../../features";
import "./LogInPanel.styles.css";
import type { TAuthorize } from "../../utils/types";
import { useDispatch } from "react-redux";
import { logInUser, logOffUser } from "../../store/actions";
import { store } from "../../store/store";
import { eq } from "lodash";
import { Avatar } from "../../components/Avatar/Avatar";

const { Password } = Input;

const ComponentKeys = {
  form: "logInForm",
};

const FormLabels = {
  email: "Логин",
  password: "Пароль",
  passwordRepeat: "Повторите пароль",
};

const FormItemsNames = {
  email: "email",
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

  const handleModalSubmit = () => {
    createGetRequest<TAuthorize>({
      url: "http://localhost:4000/authorize",
      values: modalFormRef.current.getFieldsValue(),
      callBack: setUser,
    });
  };

  const setUser = (data: any) => dispatch(logInUser(data));
  const unSetUser = () => {
    dispatch(logOffUser());
    setFormFailed(false);
  };

  const handleDrawerSubmit = () => {
    console.log(drawerFormRef.current.getFieldsValue());
    createPostRequest({
      url: "http://localhost:4000/registrate",
      values: drawerFormRef.current.getFieldsValue(),
    });
  };

  const handleModal = useCallback(() => setModalOpened(!isModalOpened), [
    isModalOpened,
  ]);

  const handleDrawer = useCallback(() => {
    setDrawerOpened(!isDrawerOpened);
    setModalOpened(false);
  }, [isDrawerOpened]);

  const drawerForm = useCallback(() => {
    return (
      <Form
        key={ComponentKeys.form}
        name={ComponentKeys.form}
        ref={drawerFormRef}
        layout={"vertical"}
      >
        <Form.Item label={FormLabels.email} name={FormItemsNames.email}>
          <Input placeholder={"Введите логин"} />
        </Form.Item>
        <Form.Item label={FormLabels.password} name={FormItemsNames.password}>
          <Password placeholder={"Введите пароль"} />
        </Form.Item>
        <Form.Item
          label={FormLabels.passwordRepeat}
          name={FormItemsNames.passwordRepeat}
        >
          <Password placeholder={"Пвторите пароль"} />
        </Form.Item>
      </Form>
    );
  }, []);

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
        >
          <Form.Item
            label={FormLabels.email}
            name={FormItemsNames.email}
            validateStatus={isFormFailed ? "error" : undefined}
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

  return isUserAuthorized ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar />
      <Button text={"Выйти"} onClick={unSetUser} />
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
