import { PureComponent } from "react";
import { Collapse } from "antd";
import "./AddQuestionGuide.styles.css";

const { Panel } = Collapse;

// Компонент с гайдом заполнения формы
class AddQuestionGuide extends PureComponent {
  render() {
    return (
      <aside className={"add-question-guide"}>
        <div className={"add-question-guide-header"}>
          {"Простые советы по заполнению формы вопроса"}
        </div>
        <Collapse>
          <Panel header="Первый шаг" key="1">
            <p>{"Задайте кратко свой вопрос(обязательный параметр)"}</p>
          </Panel>
          <Panel header="Второй шаг" key="2">
            <p>
              {
                "Более подробно объясните суть своего вопроса(обязательный параметр)"
              }
            </p>
          </Panel>
          <Panel header="Третий шаг" key="3">
            <p>{"Подберите теги, характеризующие тему вашего вопроса"}</p>
          </Panel>
          <Panel header="Четвёртый шаг" key="4">
            <p>
              {
                "При необходимости добавьте 1 и более картинок для объяснения сути вопроса"
              }
            </p>
          </Panel>
        </Collapse>
      </aside>
    );
  }
}

export default AddQuestionGuide;
