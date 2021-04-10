import React from "react";
import { IForumListItemProps } from "./ForumListItem.types";
import { Row, Col, Card } from "antd";
import "./ForumListItem.styles.css";
import { map, keyBy, find } from "lodash";
import Tag from "../Tag/Tag";
import { spheres } from "../../const";
import { withRouter } from "react-router-dom";

// Компонент списка вопросов
class ForumListItem extends React.PureComponent<IForumListItemProps> {
  constructor(props: IForumListItemProps) {
    super(props);

    // Привязка обработчика к текущему контексту
    this.handleRedirectToQuestion = this.handleRedirectToQuestion.bind(this);
  }

  // Стили карточки с вопросом
  private readonly cardStyle = {
    width: "600px",
    padding: "0 20px !important",
    marginBottom: "20px",
  };

  // Функция перехода к конкретному вопросу
  private handleRedirectToQuestion() {
    const { id, history } = this.props;

    history.push(`/question/${id}`);
  }

  /**
   * Отображение тегов, имеющихся у вопроса
   * Проходимся по всем тегам и по тексту тега получаем его цвет и соотв-но отображаем тег с цветом и текстом
   */
  private tagsGenerator(tags: string[] | undefined) {
    const spheresWithKeyNames = keyBy(spheres, (elem) => elem.value);
    return (
      <div>
        {map(tags, (tag, index) => {
          const currentSphereData = find(
            spheresWithKeyNames,
            (elem) => elem.value === tag,
          );
          return (
            <Tag
              text={tag}
              key={`tag_${index}`}
              color={currentSphereData?.color}
            />
          );
        })}
      </div>
    );
  }

  // Отрисовка компонента
  render() {
    const { question, tags } = this.props;

    return (
      <Card
        style={this.cardStyle}
        className={"forum-list-item-style"}
        onClick={this.handleRedirectToQuestion}
      >
        <Row>
          <Col className={"forum-list-item-data-col-style"}>
            <span className={"forum-list-item-title-style"}>{question}</span>
            <div>{this.tagsGenerator(tags)}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(ForumListItem);
