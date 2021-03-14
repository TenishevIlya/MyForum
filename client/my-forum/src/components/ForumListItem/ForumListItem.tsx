import React from "react";
import { IForumListItemProps } from "./ForumListItem.types";
import { Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ForumListItem.styles.css";
import { map } from "lodash";
import Tag from "../Tag/Tag";

class ForumListItem extends React.PureComponent<IForumListItemProps> {
  private tagsGenerator(tags: string[]) {
    // return map(tags, (tag, index) => {
    //   return <Tag text={tag} key={`tag_${index}`} color="orange" />;
    // });

    return (
      <div>
        {map(tags, (tag, index) => {
          return <Tag text={tag} key={`tag_${index}`} color="orange" />;
        })}
      </div>
    );
  }

  render() {
    const { question, answersCount, views, tags } = this.props;

    const tagsTest = ["Спорт", "Наука", "IT"];

    return (
      <Row className={"forum-list-item-style"}>
        <Col className={"forum-list-item-avatar-col-style"}>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col className={"forum-list-item-data-col-style"}>
          <span>{question}</span>
          <div>{this.tagsGenerator(tagsTest)}</div>
        </Col>
      </Row>
    );
  }
}

export default ForumListItem;
