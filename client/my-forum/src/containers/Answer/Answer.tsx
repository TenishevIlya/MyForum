import { PureComponent } from "react";
import { IAnswerTypesProps } from "./Answer.types";
import { Divider, Avatar } from "antd";
import "./Answer.styles.css";
import { timestampToMilliseconds } from "../../features";
import moment from "moment";

class Answer extends PureComponent<IAnswerTypesProps> {
  render() {
    const { answerData } = this.props;

    return (
      <section className={"answer-container-styles"}>
        <div className={"answer-avatar-block-styles"}>
          <Avatar size={60} />
          {/* <Divider type={"vertical"} /> */}
        </div>
        <div className={"explanation-container-styles"}>
          <Divider type={"vertical"} className={"divider-styles"} />
          {answerData.explanation}
          <span className={"creation-time-styles"}>
            {moment(
              timestampToMilliseconds(answerData.creation_date),
            ).fromNow()}
          </span>
        </div>
      </section>
    );
  }
}

export default Answer;
