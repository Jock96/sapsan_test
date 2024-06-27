export interface IColumnsCountCalculator {
  width: number;
  columnWidth: number;
}

export const calculateColumnsCount = ({
  width,
  columnWidth,
}: IColumnsCountCalculator) => Math.floor(width / columnWidth);
