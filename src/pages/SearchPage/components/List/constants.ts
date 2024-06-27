import { DEFAULT_PAGE_SIZE, type IPhoto } from "../../../../api";
import { EMPTY, FETCHER_ID } from "../../../../components";

export const GAP = 8;

export const IMAGE_SKELETON_DATA = new Array<IPhoto>(DEFAULT_PAGE_SIZE)
  .fill({} as IPhoto)
  .map((_, index) => ({
    url: EMPTY,
    id: index === 0 ? FETCHER_ID : EMPTY,
  }));
