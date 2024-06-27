import { GAP } from "../constants";
import type { IOffset } from "../types";

interface IListHeightCalculator extends IOffset {
  withGap?: boolean;
  height: number;
}

export const calculateListHeight = ({
  height,
  offset = 0,
  withGap = true,
}: IListHeightCalculator) => height - offset - (withGap ? 2 * GAP : 0);
