export type CellIdType = string;
export type CellValueType = number;

export type CellType = {
  id: CellIdType;
  amount: CellValueType;
};

export type RowType = {
  id: string;
  cells: CellType[];
};

export type MatrixType = RowType[];

export type MatrixValuesType = {
  m: number;
  n: number;
  x: number;
};

export type SvgProps = {
  className?: string;
};
