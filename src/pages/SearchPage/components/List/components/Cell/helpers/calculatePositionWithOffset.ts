import { GAP } from "../../../constants";
import type { IGapProps } from "../types";

interface IPositionWithOffsetCalculator extends IGapProps {
  index: number;
  position: string;
}

export const calculatePositionWithOffset = ({
  index,
  position,
  withGap = true,
}: IPositionWithOffsetCalculator) =>
  index !== 0 ? parseInt(position) + (withGap ? GAP * index : 0) : position;
