import { createContext } from "react";
import { Matrix, MatrixValuesType } from "../types";

export type MatrixContextType = {
  matrixValues: MatrixValuesType;
  matrix: Matrix;
  setMatrixValues: (values: MatrixValuesType) => void;
  setMatrix: (matrix: Matrix) => void;
  createMatrix: (rows: number, cols: number) => Matrix;
  handleCellClick: (cellId: string) => void;
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
  handleCellClick: () => {},
  addRow: () => {},
  removeRow: () => {},
};

export const MatrixContext = createContext<MatrixContextType>(defaultContext);
