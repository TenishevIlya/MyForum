import React from "react";
import { PageHeader } from "antd";
import "./MainLayout.style.css";
import LogInPanel from "../../containers/AuthorizeContainer/AuthorizeContainer";
import LinksPanel from "../../containers/LinksPanel/LinksPanel";
import { TLinkItem } from "../../containers/LinksPanel/LinksPanel.types";
import { withRouter, RouteComponentProps } from "react-router";
import { store } from "../../store/store";
import { isEmpty } from "lodash";
import Footer from "../../components/Footer/Footer";

// Интерфейс базового лэйаута расширяющий тип пропсов для роутинга
interface IMainLayoutProps extends RouteComponentProps {}

// Базовый лэйаут всего приложения
class MainLayout extends React.PureComponent<IMainLayoutProps> {
  // Базовые ссылки в верхней панели
  private readonly layoutLinks: TLinkItem[] = [
    { text: "На главную", path: "/", needLogIn: false },
    { text: "Задать вопрос", path: "/addQuestion", needLogIn: true },
  ];

  /**
   * Проверка на случай, чтобы если мы вышли из профиля на странице профиля
   * то приложение не упало, а корректно сделало выход их профиля и переход на главную страницу
   */
  public componentDidMount() {
    if (
      isEmpty(store.getState().personReducer) &&
      this.props.history.location.pathname === "/user"
    ) {
      this.props.history.push("/");
    }
  }

  /**
   * Отрисовка базового лэйаута
   * Внутри тега <main></main> прокидываем проп children для того,
   * чтобы все остальные компоненты корректно отображались как дочерние для лэйаута
   */
  render() {
    return (
      <>
        <div className="main-layout-container-styles">
          <PageHeader
            key={"header"}
            className={"main-layout-header-styles"}
            title={"MyForum"}
            extra={[<LogInPanel />]}
            subTitle={<LinksPanel items={this.layoutLinks} />}
          />
          <main key={"main"} className={"main-layout-styles"}>
            {this.props.children}
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(MainLayout);
