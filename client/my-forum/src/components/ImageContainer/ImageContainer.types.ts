export interface IImageContainerProps {
  imagesPaths: string[] | undefined;
  direction?: "vertical" | "horizontal";
}

export type TDirectionType = "vertical" | "horizontal" | undefined;
