import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

class App extends React.PureComponent {
  public componentDidMount() {
    fetch("http://localhost:4000/allData")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  render() {
    return <Link to="/test">На тестовую</Link>;
  }
}

export default App;
