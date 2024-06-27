import type { IPhoto } from "../../../../../../api";
import type { IFetcher } from "../../../../../../components";
import type { ILazyLoading, IListChildComponentProps } from "../../types";

export interface IGapProps {
  withGap?: boolean;
}

export interface ICellProps
  extends IGapProps,
    IListChildComponentProps,
    IFetcher,
    ILazyLoading {
  photosMatrix: IPhoto[][];
}
