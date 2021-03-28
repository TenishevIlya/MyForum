import React from "react";
import { IForumListItemProps } from "./ForumListItem.types";
import { Avatar, Row, Col, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ForumListItem.styles.css";
import { map, keyBy, find } from "lodash";
import Tag from "../Tag/Tag";
import { spheres } from "../../const";
import { withRouter } from "react-router-dom";

class ForumListItem extends React.PureComponent<IForumListItemProps> {
  constructor(props: IForumListItemProps) {
    super(props);

    this.handleRedirectToQuestion = this.handleRedirectToQuestion.bind(this);
  }

  private readonly cardStyle = {
    width: "600px",
    padding: "0 20px !important",
    marginBottom: "20px",
  };

  private handleRedirectToQuestion() {
    const { id, history } = this.props;

    history.push(`/question/${id}`);
  }

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

  render() {
    const { question, answersCount, views, tags } = this.props;

    const tagsTest = ["Спорт", "Наука", "IT"];

    return (
      <Card
        style={this.cardStyle}
        className={"forum-list-item-style"}
        onClick={this.handleRedirectToQuestion}
      >
        <Row>
          <Col className={"forum-list-item-avatar-col-style"}>
            <Avatar icon={<UserOutlined />} />
          </Col>
          <Col className={"forum-list-item-data-col-style"}>
            <span>{question}</span>
            <div>{this.tagsGenerator(tags)}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(ForumListItem);
