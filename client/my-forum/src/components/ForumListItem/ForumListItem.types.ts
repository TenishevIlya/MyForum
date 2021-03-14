export interface IForumListItemProps
  extends Partial<{
    question: string;
    answersCount: number;
    views: number;
    tags: string[];
  }> {}
