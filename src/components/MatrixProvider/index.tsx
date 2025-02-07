import { ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultMatrixValues, MatrixContext } from "../../context/MatrixContext";
import { CellType, MatrixType, MatrixValuesType, RowType } from "../../types";

type MatrixProviderProps = {
  children: ReactNode;
};

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [matrixValues, setMatrixValues] = useState<MatrixValuesType>(defaultMatrixValues);
  const [matrix, setMatrix] = useState<MatrixType>([]);

  const addRow = () => {
    const newRow: RowType = {
      id: uuidv4(),
      cells: [],
    };

    const numCells = matrixValues.n;
    for (let j = 0; j < numCells; j++) {
      newRow.cells.push({
        id: uuidv4(),
        amount: Math.floor(Math.random() * 900) + 100,
      });
    }
    setMatrix((prevMatrix) => [...prevMatrix, newRow]);
  };

  const removeRow = () => {
    if (!matrix.length) return;
    const newMatrix = matrix.slice(0, -1);
    setMatrix(newMatrix);
  };

  const increaseCellAmount = (cellId: string) => {
    setMatrix((prevMatrix) => {
      return prevMatrix.map((row) => ({
        ...row,
        cells: row.cells.map((cell) => {
          if (cell.id === cellId) {
            return { ...cell, amount: cell.amount + 1 };
          }
          return cell;
        }),
      }));
    });
  };

  const createMatrix = (rows: number, cols: number): MatrixType => {
    const generatedMatrix: RowType[] = [];

    for (let i = 0; i < rows; i++) {
      const cells: CellType[] = [];
      for (let j = 0; j < cols; j++) {
        const cell: CellType = {
          id: uuidv4(),
          amount: Math.floor(Math.random() * 900) + 100, // випадкове число від 100 до 999
        };
        cells.push(cell);
      }
      const row: RowType = {
        id: uuidv4(),
        cells,
      };
      generatedMatrix.push(row);
    }

    return generatedMatrix;
  };

  useEffect(() => {
    const newMatrix = createMatrix(matrixValues.m, matrixValues.n);

    setMatrix(newMatrix);
  }, [matrixValues.m, matrixValues.n]);

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        matrixValues,
        setMatrixValues,
        setMatrix,
        createMatrix,
        increaseCellAmount,
        addRow,
        removeRow,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
}
