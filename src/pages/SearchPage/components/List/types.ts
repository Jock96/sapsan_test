import type { CSSProperties, PropsWithChildren } from "react";
import type { IPhoto } from "../../../../api";

export interface IOffset {
  offset?: number;
}

export interface ILazyLoading {
  canFetchMore?: boolean;
  onFetchMore: () => Promise<void>;
}

export interface IListProps extends IOffset, ILazyLoading {
  loading?: boolean;
  error?: boolean;
  photos: IPhoto[];
}

export interface IListChildComponentProps extends PropsWithChildren {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}
