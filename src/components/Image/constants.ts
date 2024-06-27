import type { IMediaContext } from "../../contexts";
import type { ImageDimension } from "./types";

const DEFAULT_MOBILE_SIZE = 114;
const DEFAULT_SIZE = 204;

export const IMAGE_DIMENSIONS: Record<keyof IMediaContext, ImageDimension<number>> = {
  mobile: {
    width: DEFAULT_MOBILE_SIZE,
    height: DEFAULT_MOBILE_SIZE,
  },
  tablet: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
  },
  desktop: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
  },
};
