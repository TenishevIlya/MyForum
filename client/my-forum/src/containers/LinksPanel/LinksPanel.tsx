import React from "react";
import type { ILinksPanelProps } from "./LinksPanel.types";
import { map } from "lodash";
import { Link } from "react-router-dom";
import "./LinksPanel.styles.css";

const LinksPanel: React.FC<ILinksPanelProps> = ({
  items,
}: ILinksPanelProps) => {
  return (
    <section>
      {map(items, (item) => {
        return (
          <Link to={item.path} className={"link-panel-item"}>
            {item.text}
          </Link>
        );
      })}
    </section>
  );
};

export default LinksPanel;
