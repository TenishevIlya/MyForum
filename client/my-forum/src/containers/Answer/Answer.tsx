import { PureComponent } from "react";
import { IAnswerTypesProps } from "./Answer.types";
import { Divider } from "antd";
import "./Answer.styles.css";
import { timestampToMilliseconds } from "../../features";
import moment from "moment";
import { Avatar } from "../../components/Avatar/Avatar";
import ImageContainer from "../../components/ImageContainer/ImageConatiner";
import { isNull } from "lodash";
import "moment/locale/ru";
// локализация для времени
moment.locale("ru");

class Answer extends PureComponent<IAnswerTypesProps> {
  render() {
    const { answerData } = this.props;

    // Проверка наличия пути для отображения автара в ответе на вопрос
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
              {/*Текст объяснения*/}
              <span className={"answer-data-styles"}>
                {answerData.explanation}
              </span>
              <span className={"creation-time-styles"}>
                {/*Имя автора*/}
                <span className={"answer-author-styles"}>
                  {answerData.name}
                  {", "}
                </span>
                {/*Время, когда был задан вопрос
                   Специально делаем replace для случая, когда локализация не совсем корректна с точки зрения логики
                */}
                {moment(timestampToMilliseconds(answerData.creation_date))
                  .fromNow()
                  .replace("через 3 часа", "около 3-х часов назад")}
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
