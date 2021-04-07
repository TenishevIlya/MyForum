import { FC } from "react";
import { Image } from "antd";
import { IImageContainerProps, TDirectionType } from "./ImageContainer.types";
import { map, isEmpty } from "lodash";
import "./ImageContainer.styles.css";

const ImageContainer: FC<IImageContainerProps> = ({
  imagesPaths,
  direction,
}: IImageContainerProps) => {
  const setLayoutStyles = (direction: TDirectionType) => {
    if (!direction) {
      return "image-container-horizontal-styles";
    }
    return `image-container-${direction}-styles`;
  };

  return (
    <section className={setLayoutStyles(direction)}>
      {!isEmpty(imagesPaths)
        ? map(imagesPaths, (picture, index) => {
            return (
              <div className={"image-block-style"} key={`${index}_image`}>
                <Image src={picture} width={200} />
              </div>
            );
          })
        : null}
    </section>
  );
};

export default ImageContainer;
