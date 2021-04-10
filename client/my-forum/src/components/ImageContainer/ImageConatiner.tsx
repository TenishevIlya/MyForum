import { FC } from "react";
import { Image } from "antd";
import { IImageContainerProps, TDirectionType } from "./ImageContainer.types";
import { map, isEmpty } from "lodash";
import "./ImageContainer.styles.css";

// Компонент отрисовки картинок
const ImageContainer: FC<IImageContainerProps> = ({
  imagesPaths,
  direction,
}: IImageContainerProps) => {
  /**
   * Расположение картинок в зависимости от передачи параметра напрвления(вертикально/горизонтально)
   */
  const setLayoutStyles = (direction: TDirectionType) => {
    if (!direction) {
      return "image-container-horizontal-styles";
    }
    return `image-container-${direction}-styles`;
  };

  //Отрисовка компонента
  return (
    <section className={setLayoutStyles(direction)}>
      {!isEmpty(imagesPaths)
        ? // Проходимся по массиву путей и если они есть, то отрисуем, если нет, то отрисовки не будет
          map(imagesPaths, (picture, index) => {
            return (
              <div className={"image-block-style"} key={`${index}_image`}>
                <Image className={"image-styles"} src={picture} width={200} />
              </div>
            );
          })
        : null}
    </section>
  );
};

export default ImageContainer;
