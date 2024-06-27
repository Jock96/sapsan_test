import type { ImageDimension } from "../../Image";
import { ImageModalPorps } from "../types";

interface IDimensionCalculator {
  src: ImageModalPorps["src"];
  offsetWidth?: number;
  offsetHeight?: number;
}

export const calculateImageDimension = ({
  src,
  offsetWidth = 0,
  offsetHeight = 0,
}: IDimensionCalculator): Partial<ImageDimension> => {
  if (!src) return { width: undefined, height: undefined };

  const img = new Image();
  img.src = src;

  const { innerWidth, innerHeight } = window;
  const { width, height } = img;

  const layoutWidth = innerWidth - offsetWidth;
  const layoutHeight = innerHeight - offsetHeight;

  const isWidthMoreThanScreen = width > innerWidth - offsetWidth;
  const isHeightMoreThanScreen = height > innerHeight - offsetHeight;

  const isMoreThanScreen = isWidthMoreThanScreen || isHeightMoreThanScreen;

  if (!isMoreThanScreen) {
    return { width, height };
  }

  const isWide = width > height;
  const proportions = isWide ? height / width : width / height;

  const isBothMoreThanWindow = isWidthMoreThanScreen && isHeightMoreThanScreen;

  if (isBothMoreThanWindow) {
    const tempDimension = isWide
      ? {
          width: layoutWidth,
          height:
            Math.floor(proportions * layoutWidth) > layoutHeight
              ? layoutHeight
              : Math.floor(proportions * layoutWidth),
        }
      : {
          width:
            Math.floor(proportions * layoutHeight) > layoutWidth
              ? layoutWidth
              : Math.floor(proportions * layoutHeight),
          height: layoutHeight,
        };

    return tempDimension;
  }

  return {
    width: isWide ? Math.floor(proportions * layoutWidth) : width,
    height: !isWide ? Math.floor(proportions * layoutHeight) : height,
  };
};
