import type { ImageProps, ImageDimension } from "../Image";
import type { IModalProps } from "../Modal";

export interface ImageModalPorps
  extends Omit<IModalProps, "style" | "children">,
    Pick<ImageProps, "src" | "alt">,
    Partial<ImageDimension> {}
