import React, { useState } from "react";
import type { ILinksPanelProps } from "./LinksPanel.types";
import { map, isEmpty } from "lodash";
import { Link } from "react-router-dom";
import "./LinksPanel.styles.css";
import { store } from "../../store/store";
import { message } from "antd";

// Контейнер с ссылками в верхней панели форума
const LinksPanel: React.FC<ILinksPanelProps> = ({
  items,
}: ILinksPanelProps) => {
  // state для проверки авторизован пользователь или нет
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>();
  // генератор уникальных ключей для элементов контейнера
  const generateItemKey = (index: number) => `item_${index}`;

  // Сообщение, появляющееся при попытке задать вопрос, не будучи авторизованным
  const needLoginMessage = (needLogIn: boolean) =>
    needLogIn &&
    !isUserLoggedIn &&
    message.error("Для того, чтобы задать вопрос необоходимо авторизоваться");

  store.subscribe(() => {
    if (isEmpty(store.getState().personReducer)) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  });

  /**
   * Настройка пути для ссылки
   * Если для ссылки необходима авторизация и пользователь не авторизован, то перехода по ссылке не будет
   * В обратном случае или тогда, когда авторизация не нужна - переход осуществится
   */
  const isAbleToRedirect = (needLogIn: boolean, itemPath: string) => {
    if (needLogIn && !isUserLoggedIn) {
      return "#";
    }
    if (!needLogIn) {
      return itemPath;
    }
    if (needLogIn && isUserLoggedIn) {
      return itemPath;
    }
    return "#";
  };

  return (
    <section>
      <img
        className={"app-icon-style"}
        src={"http://localhost:4000/public/icon/appIcon.png"}
      />
      {/*Проходим по всему массиву ссылок и рендерим их*/}
      {map(items, (item, index) => {
        return (
          <Link
            to={isAbleToRedirect(item.needLogIn, item.path)}
            key={`${generateItemKey(index)}`}
            className={"link-panel-item"}
            onClick={() => {
              needLoginMessage(item.needLogIn);
            }}
          >
            {item.text}
          </Link>
        );
      })}
    </section>
  );
};

export default LinksPanel;
