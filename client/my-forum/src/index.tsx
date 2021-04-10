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
