import { ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultMatrixValues, MatrixContext } from "../../context/MatrixContext";
import { Cell, Matrix, MatrixValuesType, Row } from "../../types";

type MatrixProviderProps = {
  children: ReactNode;
};

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [matrixValues, setMatrixValues] = useState<MatrixValuesType>(defaultMatrixValues);
  const [matrix, setMatrix] = useState<Matrix>([]);

  const addRow = () => {
    const newRow: Row = {
      id: uuidv4(),
      cells: [],
    };
    // Припустимо, що кількість клітинок у новому рядку має бути такою ж, як у першому рядку матриці або взята з matrixValues.n
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

  const handleCellClick = (cellId: string) => {
    // Знайти рядок і клітинку за унікальним id
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

  const createMatrix = (rows: number, cols: number): Matrix => {
    const generatedMatrix: Row[] = [];

    for (let i = 0; i < rows; i++) {
      const cells: Cell[] = [];
      for (let j = 0; j < cols; j++) {
        const cell: Cell = {
          id: uuidv4(),
          amount: Math.floor(Math.random() * 900) + 100, // випадкове число від 100 до 999
        };
        cells.push(cell);
      }
      const row: Row = {
        id: uuidv4(),
        cells,
      };
      generatedMatrix.push(row);
    }
    console.log("Generated matrix", generatedMatrix);
    return generatedMatrix;
  };

  useEffect(() => {
    const newMatrix = createMatrix(matrixValues.m, matrixValues.n);
    console.log("New matrix", newMatrix);
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
        handleCellClick,
        addRow,
        removeRow,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
}
