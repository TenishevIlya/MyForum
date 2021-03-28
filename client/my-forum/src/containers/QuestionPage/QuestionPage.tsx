import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { IQuestionPageProps, IQuestionPageState } from "./QuestionPage.types";
import QuestionHeader from "../../components/QuestionHeader/QuestionHeader";
import QuestionExplanation from "../../components/QuestionExplanation/QuestionExplanation";
import Spinner from "../../components/Spinner/Spinner";
import { Divider } from "antd";
import { timestampToMilliseconds } from "../../features";

class QuestionPage extends PureComponent<
  IQuestionPageProps,
  IQuestionPageState
> {
  private readonly questionId = this.props.match.params.id;

  public readonly state = {
    questionData: null,
  } as IQuestionPageState;

  public componentDidMount() {
    fetch(`http://localhost:4000/question/${this.questionId}`)
      .then((res) => res.json())
      .then((data) => this.setState({ questionData: data }));
  }

  render() {
    const { questionData } = this.state;

    if (!questionData) {
      return <Spinner size={"large"} />;
    }

    return (
      <>
        <QuestionHeader
          title={questionData.title}
          timesViewed={0}
          creationDateTimestamp={timestampToMilliseconds(
            questionData.creationDate,
          )}
        />
        <Divider />
        <QuestionExplanation explanationText={questionData.explanation} />
        <Divider />
      </>
    );
  }
}

export default withRouter(QuestionPage);
