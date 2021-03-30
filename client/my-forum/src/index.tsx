import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./containers/MainPage/MainPage";
import Test from "./Test";
import AddQuestionContainer from "./containers/AddQuestionContainer/AddQuestionContainer";
import QuestionPage from "./containers/QuestionPage/QuestionPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <MainLayout>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/addQuestion">
              <AddQuestionContainer />
            </Route>
            <Route path="/question/:id">
              <QuestionPage />
            </Route>
          </MainLayout>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
