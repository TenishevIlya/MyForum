import { PureComponent } from "react";
import { IAnswerTypesProps } from "./Answer.types";
import { Divider } from "antd";
import "./Answer.styles.css";
import { timestampToMilliseconds } from "../../features";
import moment from "moment";
import { Avatar } from "../../components/Avatar/Avatar";
import ImageContainer from "../../components/ImageContainer/ImageConatiner";
import { isNull } from "lodash";

class Answer extends PureComponent<IAnswerTypesProps> {
  render() {
    const { answerData } = this.props;

    const getAvatarPath = () => {
      return !isNull(answerData.avatar_url)
        ? answerData.avatar_url[0]
        : undefined;
    };

    return (
      <>
        <section className={"answer-container-styles"}>
          <div className={"answer-avatar-block-styles"}>
            <Avatar size={60} src={getAvatarPath()} />
          </div>
          <div className={"explanation-container-styles"}>
            <Divider type={"vertical"} className={"divider-styles"} />
            <div>
              <span className={"answer-data-styles"}>
                {answerData.explanation}
              </span>
              <span className={"creation-time-styles"}>
                <span className={"answer-author-styles"}>
                  {answerData.name}
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
        <Divider />
      </>
    );
  }
}

export default Answer;
