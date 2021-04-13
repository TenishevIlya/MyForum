import { PureComponent } from "react";
import "./AddQuestionContainer.styles.css";
import AddQuestionForm from "./AddQuestionForm/AddQuestionForm";
import AddQuestionGuide from "./AddQuestionGuide/AddQuestionGuide";

// Контейнер, включающий в себя все элементы страницы с добавлением вопроса
class AddQuestionContainer extends PureComponent {
  render() {
    return (
      <div className={"add-question-container"}>
        <AddQuestionForm />
        <AddQuestionGuide />
      </div>
    );
  }
}

export default AddQuestionContainer;
