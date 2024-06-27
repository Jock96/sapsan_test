import type { FC } from "react";
import type { ICellProps } from "./types";

import {
  FetchMoreObserver,
  Image,
  FETCHER_ID,
  EMPTY,
} from "../../../../../../components";
import { calculatePositionWithOffset } from "./helpers";

export const Cell: FC<ICellProps> = ({
  columnIndex,
  rowIndex,
  style,
  photosMatrix,
  canFetchMore,
  onFetchMore,
}) => {
  if (!photosMatrix.length) return null;

  const photo = photosMatrix[rowIndex][columnIndex];

  if (!photo) return null;

  const left = calculatePositionWithOffset({
    index: columnIndex,
    position: (style.left ?? 0).toString(),
  });

  const top = calculatePositionWithOffset({
    index: rowIndex,
    position: (style.top ?? 0).toString(),
  });

  const { id, url } = photo;

  const skeleton = id === EMPTY;
  const fetcher = canFetchMore && id === FETCHER_ID;

  return (
    <div style={{ ...style, left, top }}>
      {fetcher ? (
        <FetchMoreObserver onFetchMore={onFetchMore} />
      ) : (
        <Image src={url} loading={skeleton} />
      )}
    </div>
  );
};
