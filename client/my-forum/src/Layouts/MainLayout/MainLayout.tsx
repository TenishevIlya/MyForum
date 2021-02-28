import React from "react";
import { PageHeader, Space } from "antd";
import "./MainLayout.style.css";
import LogInPanel from "../../containers/LogInPanel/LogInPanel";
import LinksPanel from "../../containers/LinksPanel/LinksPanel";
import { TLinkItem } from "../../containers/LinksPanel/LinksPanel.types";

class MainLayout extends React.PureComponent {
  private readonly layoutLinks: TLinkItem[] = [
    { text: "Разделы", path: "/sections" },
    { text: "Пользователи", path: "/users" },
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
        <Space direction="horizontal" className={"main-layout-style"}>
          {this.props.children}
        </Space>
      </>
    );
  }
}

export default MainLayout;
