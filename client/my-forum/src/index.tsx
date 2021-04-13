/**
 * Головной файл всего приложения
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./containers/MainPage/MainPage";
import AddQuestionContainer from "./containers/AddQuestionContainer/AddQuestionContainer";
import QuestionPage from "./containers/QuestionPage/QuestionPage";
import UserProfile from "./containers/UserProfile/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

/**
 * На самом верху используется компонент <Provider></Provider> - нужен для того, чтобы глобальный стор был доступен во всех вложенных компонентах
 * <Router></Router> - компонент, который устанавливает роутинг для всего приложения
 * <Switch></Switch> - позволяет осуществлять переключение между роутами
 * <Route></Route> - непостредственно сам элемент роутинга
 */

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <MainLayout>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/addQuestion">
            <AddQuestionContainer />
          </Route>
          <Route path="/question/:id">
            <QuestionPage />
          </Route>
          <Route path="/user">
            <UserProfile />
          </Route>
        </MainLayout>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
