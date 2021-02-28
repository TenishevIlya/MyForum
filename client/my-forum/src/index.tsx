import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Test from "./Test";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <MainLayout>
          <Route exact path="/">
            <App />
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
