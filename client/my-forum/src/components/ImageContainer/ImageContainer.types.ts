// Интерфейс контейнера с картинками
export interface IImageContainerProps {
  imagesPaths: string[] | undefined;
  direction?: "vertical" | "horizontal";
}

// Тип направлений
export type TDirectionType = "vertical" | "horizontal" | undefined;
