import React from "react";
import type { ILinksPanelProps } from "./LinksPanel.types";
import { map } from "lodash";
import { Link } from "react-router-dom";
import "./LinksPanel.styles.css";

const LinksPanel: React.FC<ILinksPanelProps> = ({
  items,
}: ILinksPanelProps) => {
  const generateItemKey = (index: number) => `item_${index}`;

  return (
    <section>
      {map(items, (item, index) => {
        return (
          <Link
            to={item.path}
            key={`${generateItemKey(index)}`}
            className={"link-panel-item"}
          >
            {item.text}
          </Link>
        );
      })}
    </section>
  );
};

export default LinksPanel;
