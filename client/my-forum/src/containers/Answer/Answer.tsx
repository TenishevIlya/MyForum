import { PureComponent } from "react";
import { IAnswerTypesProps } from "./Answer.types";
import { Divider } from "antd";
import "./Answer.styles.css";
import { timestampToMilliseconds } from "../../features";
import moment from "moment";
import { Avatar } from "../../components/Avatar/Avatar";
import ImageContainer from "../../components/ImageContainer/ImageConatiner";

class Answer extends PureComponent<IAnswerTypesProps> {
  render() {
    const { answerData } = this.props;

    return (
      <section className={"answer-container-styles"}>
        <div className={"answer-avatar-block-styles"}>
          <Avatar size={60} />
        </div>
        <div className={"explanation-container-styles"}>
          <Divider type={"vertical"} className={"divider-styles"} />
          <div>
            <span>{answerData.explanation}</span>
            <span className={"creation-time-styles"}>
              <span className={"answer-author-styles"}>
                {answerData.email}
                {", "}
              </span>
              {moment(
                timestampToMilliseconds(answerData.creation_date),
              ).fromNow()}
            </span>
            <ImageContainer
              direction={"vertical"}
              imagesPaths={answerData.picture_url}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Answer;
