import { getSlicedArray } from "../../../../../helpers";
import {
  calculateColumnsCount,
  IColumnsCountCalculator,
} from "./calculateColumnsCount";

interface IMatrixCreator<T> extends IColumnsCountCalculator {
  list: T[];
}

export const createMatrixByDimension = <T>({
  list,
  ...dimensions
}: IMatrixCreator<T>) =>
  getSlicedArray(list, calculateColumnsCount(dimensions));
