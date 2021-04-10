import { RouteComponentProps } from "react-router";
import { TMatchParams } from "../../utils/types";

// Интерфейс props компонента
export interface IForumListItemProps
  extends RouteComponentProps<TMatchParams>,
    Partial<{
      question: string;
      answersCount: number;
      views: number;
      tags: string[];
      id: number;
    }> {}
