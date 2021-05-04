import React from "react";
import ForumListItem from "../../components/ForumListItem/ForumListItem";
import { IMainPageState, IMainPageProps } from "./MainPage.types";
import { isEmpty, map } from "lodash";
import { keyGenerator } from "../../features";
import "./MainPage.styles.css";
import { Dropdown, Menu, Empty } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { createGetRequest } from "../../features";
import Spinner from "../../components/Spinner/Spinner";

export type TLimit = {
  limit: string;
};

// Стили контейра главной страницы
class Main extends React.PureComponent<{}, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);

    // Привязка обработчика к текущему контексту
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getLimitCountValue = this.getLimitCountValue.bind(this);
    this.updateQuestionsInfo = this.updateQuestionsInfo.bind(this);
    this.getCorrectLimitText = this.getCorrectLimitText.bind(this);
  }

  // state контейнера
  public readonly state = {
    // state, отвечающий за список всех вопросов
    questions: null,
    // state, отвечающий за текущий фильтрацию
    currentLimit: 0,
  } as IMainPageState;

  // При монтировании компонента загружаем все вопросы без фильтрации
  public componentDidMount() {
    createGetRequest<TLimit>({
      url: "http://localhost:4000",
      values: { limit: "0" },
      callBack: this.updateQuestionsInfo,
    });
  }

  // Изменение текста меню с фильтрацией в зависимости от его изменения
  private getCorrectLimitText(limit: string) {
    return limit === "0" ? "Все вопросы" : `Топ-${limit} вопросов`;
  }

  // Реализация фильтрации
  private getLimitCountValue(data: any) {
    this.setState({ currentLimit: data.target.value });
    createGetRequest<TLimit>({
      url: "http://localhost:4000",
      values: { limit: data.target.value as string },
      callBack: this.updateQuestionsInfo,
    });
  }

  // Обновление данных после фильтрации
  private updateQuestionsInfo(data: any) {
    this.setState({ questions: data });
  }

  // Отрисовка компонета списка вопросов
  private renderQuestions() {
    const { questions } = this.state;

    const items = map(questions, (question, index) => {
      return (
        <ForumListItem
          id={question.id}
          key={keyGenerator(index, question.creationDate)}
          question={question.title}
          tags={question.tags}
        />
      );
    });

    return items;
  }

  render() {
    /**
     * Отрисовываем страницу
     * Если вопросы есть, то внутри мы увидим их список
     * Если нет, то будет пустой контейнер с информацией
     * Так же есть спиннер, который будет появляться, пока информация не загрузилась
     */

    return (
      <>
        {/* Список с фильтрацией */}
        <ul
          className={"navigation-list-styles"}
          onClick={this.getLimitCountValue}
        >
          <li
            className={
              this.state.currentLimit === 0
                ? "navigation-list-item-selected-styles"
                : "navigation-list-item-styles"
            }
            value={"0"}
          >
            Все вопросы
          </li>
          <li
            className={
              this.state.currentLimit === 10
                ? "navigation-list-item-selected-styles"
                : "navigation-list-item-styles"
            }
            value={"10"}
          >
            Топ-10 вопросов
          </li>
          <li
            className={
              this.state.currentLimit === 50
                ? "navigation-list-item-selected-styles"
                : "navigation-list-item-styles"
            }
            value={"50"}
          >
            Топ-50 вопросов
          </li>
        </ul>
        <article className={"main-page-items-container"}>
          {this.state.questions ? (
            <>
              {!isEmpty(this.state.questions) ? (
                this.renderQuestions()
              ) : (
                <Empty
                  description={"Пока не задано ни одного вопроса"}
                  className={"empty-questions-styles"}
                />
              )}
            </>
          ) : (
            <Spinner size={"large"} />
          )}
        </article>
      </>
    );
  }
}

export default Main;
