import React from "react";
import { PageHeader } from "antd";
import "./MainLayout.style.css";
import LogInPanel from "../../containers/LogInPanel/LogInPanel";
import LinksPanel from "../../containers/LinksPanel/LinksPanel";
import { TLinkItem } from "../../containers/LinksPanel/LinksPanel.types";
import { withRouter, RouteComponentProps } from "react-router";
import { store } from "../../store/store";
import { isEmpty } from "lodash";

interface IMainLayoutProps extends RouteComponentProps {}
class MainLayout extends React.PureComponent<IMainLayoutProps> {
  private readonly layoutLinks: TLinkItem[] = [
    { text: "Задать вопрос", path: "/addQuestion", needLogIn: true },
  ];

  public componentDidMount() {
    if (
      isEmpty(store.getState().personReducer) &&
      this.props.history.location.pathname === "/user"
    ) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <>
        <PageHeader
          key={"header"}
          className={"main-layout-header-style"}
          title={"MyForum"}
          extra={[<LogInPanel />]}
          subTitle={<LinksPanel items={this.layoutLinks} />}
        />
        <main key={"main"} className={"main-layout-style"}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default withRouter(MainLayout);
