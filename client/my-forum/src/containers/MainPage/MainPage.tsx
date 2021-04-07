import React from "react";
import ForumListItem from "../../components/ForumListItem/ForumListItem";
import { IMainPageState, IMainPageProps } from "./MainPage.types";
import { map } from "lodash";
import { keyGenerator } from "../../features";
import "./MainPage.styles.css";

class Main extends React.PureComponent<IMainPageProps, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);

    this.renderQuestions = this.renderQuestions.bind(this);
  }

  public readonly state = { questions: null } as IMainPageState;

  public componentDidMount() {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => this.setState({ questions: data }));
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

  render() {
    return (
      <article className={"main-page-items-container"}>
        <h2 className={"main-page-items-container-header"}>Топ вопросов</h2>
        {this.renderQuestions()}
      </article>
    );
  }
}

export default Main;
