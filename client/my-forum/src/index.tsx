import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import Test from "./Test";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <MainLayout>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </MainLayout>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
