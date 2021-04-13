// Интерфейс для контейнера ссылок
export interface ILinksPanelProps {
  items: TLinkItem[];
}

/*Тип элемента контейнера ссылок*/
export type TLinkItem = {
  text: string;
  path: string;
  needLogIn: boolean;
};
