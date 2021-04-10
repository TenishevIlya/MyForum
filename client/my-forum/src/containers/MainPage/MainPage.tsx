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

class Main extends React.PureComponent<IMainPageProps, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);

    this.renderQuestions = this.renderQuestions.bind(this);
    this.getMenu = this.getMenu.bind(this);
    this.getLimitCountValue = this.getLimitCountValue.bind(this);
    this.updateQuestionsInfo = this.updateQuestionsInfo.bind(this);
    this.getCorrectLimitText = this.getCorrectLimitText.bind(this);
  }

  public readonly state = {
    questions: null,
    currentLimitText: "Все вопросы",
  } as IMainPageState;

  public componentDidMount() {
    createGetRequest<TLimit>({
      url: "http://localhost:4000",
      values: { limit: "all" },
      callBack: this.updateQuestionsInfo,
    });
  }

  private getCorrectLimitText(limit: string) {
    return limit === "all" ? "Все вопросы" : `Топ-${limit} вопросов`;
  }

  private getLimitCountValue(data: any) {
    this.setState({ currentLimitText: this.getCorrectLimitText(data.key) });
    createGetRequest<TLimit>({
      url: "http://localhost:4000",
      values: { limit: data.key as string },
      callBack: this.updateQuestionsInfo,
    });
  }

  private updateQuestionsInfo(data: any) {
    this.setState({ questions: data });
  }

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
