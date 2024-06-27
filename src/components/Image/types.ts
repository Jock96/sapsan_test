import type { CSSProperties } from "react";

export interface ImageDimension<T = string | number> {
  width: T;
  height: T;
}

export interface ImageProps extends Partial<ImageDimension> {
  loading?: boolean;
  alt?: string;
  src?: string;
  className?: string;
  scaleOnClick?: boolean;
  style?: CSSProperties;
  cover?: boolean;
}
