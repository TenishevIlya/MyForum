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
    this.getMenu = this.getMenu.bind(this);
    this.getLimitCountValue = this.getLimitCountValue.bind(this);
    this.updateQuestionsInfo = this.updateQuestionsInfo.bind(this);
    this.getCorrectLimitText = this.getCorrectLimitText.bind(this);
  }

  // state контейнера
  public readonly state = {
    // state, отвечающий за список всех вопросов
    questions: null,
    // state, отвечающий фильтрацию
    currentLimitText: "Все вопросы",
  } as IMainPageState;

  // При монтировании компонента загружаем все вопросы без фильтрации
  public componentDidMount() {
    createGetRequest<TLimit>({
      url: "http://localhost:4000",
      values: { limit: "all" },
      callBack: this.updateQuestionsInfo,
    });
  }

  // Изменение текста меню с фильтрацией в зависимости от его изменения
  private getCorrectLimitText(limit: string) {
    return limit === "all" ? "Все вопросы" : `Топ-${limit} вопросов`;
  }

  // Реализация фильтрации
  private getLimitCountValue(data: any) {
    this.setState({ currentLimitText: this.getCorrectLimitText(data.key) });
    createGetRequest<TLimit>({
      url: "http://localhost:4000",
      values: { limit: data.key as string },
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

  // Меню с фильтрацией
  private getMenu() {
    return (
      <Menu onClick={this.getLimitCountValue}>
        <Menu.Item key={"all"}>
          <p>Все вопросы</p>
        </Menu.Item>
        <Menu.Item key={"10"}>
          <p>Топ-10 вопросов</p>
        </Menu.Item>
        <Menu.Item key={"50"}>
          <p>Топ-50 вопросов</p>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    /**
     * Отрисовываем страницу
     * Если вопросы есть, то внутри мы увидим их список
     * Если нет, то будет пустой контейнер с информацией
     * Так же есть спиннер, который будет появляться, пока информация не загрузилась
     */
    return (
      <article className={"main-page-items-container"}>
        {this.state.questions ? (
          <>
            <Dropdown overlay={this.getMenu} placement={"bottomCenter"}>
              <a
                className={"questions-limit-header-styles"}
                onClick={(e) => e.preventDefault()}
              >
                {this.state.currentLimitText} <DownOutlined />
              </a>
            </Dropdown>
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
    );
  }
}

export default Main;
