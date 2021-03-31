import React from "react";
import { PageHeader, Avatar } from "antd";
import "./MainLayout.style.css";
import LogInPanel from "../../containers/LogInPanel/LogInPanel";
import LinksPanel from "../../containers/LinksPanel/LinksPanel";
import { TLinkItem } from "../../containers/LinksPanel/LinksPanel.types";

class MainLayout extends React.PureComponent {
  private readonly layoutLinks: TLinkItem[] = [
    { text: "Разделы", path: "/sections" },
    { text: "Пользователи", path: "/users" },
    { text: "Задать вопрос", path: "/addQuestion" },
  ];

  render() {
    return (
      <>
        <PageHeader
          className={"main-layout-header-style"}
          title={"MyForum"}
          extra={[<LogInPanel />]}
          subTitle={<LinksPanel items={this.layoutLinks} />}
        />
        <main className={"main-layout-style"}>{this.props.children}</main>
      </>
    );
  }
}

export default MainLayout;
