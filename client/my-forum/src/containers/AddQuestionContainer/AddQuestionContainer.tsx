import { PureComponent } from "react";
import "./AddQuestionContainer.styles.css";
import AddQuestionForm from "./AddQuestionForm/AddQuestionForm";
import AddQuestionGuide from "./AddQuestionGuide/AddQuestionGuide";
import { Alert } from "antd";

class AddQuestionContainer extends PureComponent {
  private renderAlert() {
    return <Alert message="Success Text" type="success" />;
  }

  render() {
    return (
      <div className={"add-question-container"}>
        <AddQuestionForm onSuccess={this.renderAlert} />
        <AddQuestionGuide />
      </div>
    );
  }
}

export default AddQuestionContainer;
