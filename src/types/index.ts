export type CellIdType = string;
export type CellValue = number;

export type Cell = {
  id: CellIdType;
  amount: CellValue;
};

export type Row = {
  id: string;
  cells: Cell[];
};

// Matrix визначається як масив Row
export type Matrix = Row[];

export type MatrixValuesType = {
  m: number;
  n: number;
  x: number;
};
