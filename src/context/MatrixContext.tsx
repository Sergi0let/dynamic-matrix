import { createContext } from "react";
import { MatrixType, MatrixValuesType } from "../types";

export type MatrixContextType = {
  matrixValues: MatrixValuesType;
  matrix: MatrixType;
  setMatrixValues: (values: MatrixValuesType) => void;
  setMatrix: (matrix: MatrixType) => void;
  createMatrix: (rows: number, cols: number) => MatrixType;
  increaseCellAmount: (cellId: string) => void;
  addRow: () => void;
  removeRow: () => void;
};

export const defaultMatrixValues: MatrixValuesType = {
  m: 0,
  n: 0,
  x: 0,
};

const defaultContext: MatrixContextType = {
  matrixValues: defaultMatrixValues,
  setMatrixValues: () => {},
  matrix: [],
  setMatrix: () => {},
  createMatrix: () => [],
  increaseCellAmount: () => {},
  addRow: () => {},
  removeRow: () => {},
};

export const MatrixContext = createContext<MatrixContextType>(defaultContext);
