import { PureComponent } from "react";
import { Collapse } from "antd";
import "./AddQuestionGuide.styles.css";

const { Panel } = Collapse;

class AddQuestionGuide extends PureComponent {
  render() {
    return (
      <aside className={"add-question-guide"}>
        <div className={"add-question-guide-header"}>{"Простые советы"}</div>
        <Collapse>
          <Panel header="This is panel header 1" key="1">
            <p>{"Первый шаг"}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{"Второй шаг"}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{"Третий шаг"}</p>
          </Panel>
        </Collapse>
      </aside>
    );
  }
}

export default AddQuestionGuide;
