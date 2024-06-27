import type { FC } from "react";
import type { IListChildComponentProps, IListProps } from "./types";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { IMAGE_DIMENSIONS } from "../../../../components";
import { Empty } from "../Empty";
import { useMediaContext } from "../../../../contexts";
import styles from "./List.module.css";
import { Cell } from "./components";
import {
  calculateColumnsCount,
  calculateListHeight,
  createMatrixByDimension,
} from "./helpers";
import { IMAGE_SKELETON_DATA } from "./constants";

export const List: FC<IListProps> = ({
  photos,
  loading,
  error,
  offset,
  onFetchMore,
  canFetchMore,
}) => {
  const { mobile } = useMediaContext();
  const { width: imageWidth, height: imageHeight } =
    IMAGE_DIMENSIONS[mobile ? "mobile" : "desktop"];

  const isEmpty = !photos.length && !loading;

  if (isEmpty) {
    return (
      <div className={styles.emptyList}>
        <Empty error={!!error} />
      </div>
    );
  }

  const list = !canFetchMore ? photos : [...photos, ...IMAGE_SKELETON_DATA];

  return (
    <AutoSizer>
      {({ height, width }: { height: number; width: number }) => (
        <Grid
          className={styles.list}
          columnCount={calculateColumnsCount({
            width,
            columnWidth: imageWidth,
          })}
          columnWidth={imageWidth}
          rowCount={
            createMatrixByDimension({
              list,
              width,
              columnWidth: imageWidth,
            }).length
          }
          rowHeight={imageHeight}
          height={calculateListHeight({
            height,
            offset,
          })}
          width={width}
        >
          {(props: IListChildComponentProps) => (
            <Cell
              {...props}
              photosMatrix={createMatrixByDimension({
                list,
                width,
                columnWidth: imageWidth,
              })}
              canFetchMore={canFetchMore}
              onFetchMore={onFetchMore}
            />
          )}
        </Grid>
      )}
    </AutoSizer>
  );
};
