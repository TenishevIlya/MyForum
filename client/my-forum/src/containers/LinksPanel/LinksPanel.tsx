import React, { useState } from "react";
import type { ILinksPanelProps } from "./LinksPanel.types";
import { map, isEmpty } from "lodash";
import { Link } from "react-router-dom";
import "./LinksPanel.styles.css";
import { store } from "../../store/store";
import { message } from "antd";

const LinksPanel: React.FC<ILinksPanelProps> = ({
  items,
}: ILinksPanelProps) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>();
  const generateItemKey = (index: number) => `item_${index}`;

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
