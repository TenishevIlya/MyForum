import React from "react";
import ForumListItem from "./components/ForumListItem/ForumListItem";

class Main extends React.PureComponent {
  // public componentDidMount() {
  //   fetch("http://localhost:4000/allData")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }

  render() {
    return <ForumListItem question={"Какой-то тестовый вопрос"} />;
  }
}

export default Main;
