import { RouteComponentProps } from "react-router";
import { TMatchParams } from "../../utils/types";

export interface IForumListItemProps
  extends RouteComponentProps<TMatchParams>,
    Partial<{
      question: string;
      answersCount: number;
      views: number;
      tags: string[];
      id: number;
    }> {}
