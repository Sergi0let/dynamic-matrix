import { useRef, useState } from "react";
import useMatrixContext from "../../hooks/useMatrixContext";
import { Cell as CellType, Matrix } from "../../types";
import { findClosestCells } from "../../utils";
import Cell from "../Cell";
import Row from "../Row";
import s from "./Table.module.css";

const Table = () => {
  const { matrix, handleCellClick, matrixValues } = useMatrixContext();
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const { x } = matrixValues;
  const lastHoveredIdRef = useRef<string | null>(null);

  function computeColumnMedians(matrix: Matrix): number[] {
    if (matrix.length === 0) return [];

    // Кількість колонок припускаємо за кількістю клітинок у першому рядку
    const numColumns = matrix[0].cells.length;
    const medians: number[] = [];

    for (let col = 0; col < numColumns; col++) {
      // Збираємо значення з колонки
      const columnValues = matrix.map((row) => row.cells[col].amount);
      // Сортуємо значення за зростанням
      columnValues.sort((a, b) => a - b);

      const len = columnValues.length;
      const mid = Math.floor(len / 2);
      let median: number;

      if (len % 2 === 0) {
        // Якщо парна кількість елементів, обчислюємо середнє арифметичне двох центральних
        median = (columnValues[mid - 1] + columnValues[mid]) / 2;
      } else {
        // Якщо непарна – беремо центральне значення
        median = columnValues[mid];
      }
      medians.push(median);
    }
    return medians;
  }

  const columnMedians = computeColumnMedians(matrix);

  const handleClick = (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
    e.preventDefault();
    const cell = e.target as HTMLTableCellElement;
    const cellId = cell.getAttribute("data-cell-id");
    if (!cellId) return;

    handleCellClick(cellId);
  };

  // Обробник події на рівні таблиці
  const handleMouseOver = (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
    if (x === 0) return;
    // Використовуємо делегування: перевіряємо, чи target є <td> та чи містить data-cell-id
    const target = e.target as HTMLTableCellElement;

    if (target.tagName !== "TD" || !target.dataset.cellId) {
      return;
    }

    const cellId = target.getAttribute("data-cell-id");
    console.log("Mouse over", cellId);

    // Якщо ми вже наведені на цю клітинку, нічого не робимо
    if (lastHoveredIdRef.current === cellId) {
      return;
    }
    lastHoveredIdRef.current = cellId;

    // Знайдемо відповідну клітинку у матриці
    const allCells: CellType[] = matrix.flatMap((row) => row.cells);
    const hoveredCell = allCells.find((cell) => cell.id === cellId);
    if (hoveredCell) {
      const closestIds = findClosestCells(matrix, hoveredCell, x);
      setHighlightedIds(closestIds);
    }
  };

  // Обробник, який скидає підсвічування при відході курсору від таблиці
  const handleMouseLeave = () => {
    setHighlightedIds(new Set());
    lastHoveredIdRef.current = null;
  };

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  console.log(hoveredRowId);
  const handleSumMouseEnter = (rowId: string) => {
    setHoveredRowId(rowId);
  };

  const handleSumMouseLeave = () => {
    setHoveredRowId(null);
  };

  return (
    <div className={s.table}>
      <table>
        <thead></thead>
        <tbody onClick={handleClick} onMouseMove={handleMouseOver} onMouseLeave={handleMouseLeave}>
          {matrix.map((row) => {
            const sumRow = row.cells.reduce((acc, cell) => acc + cell.amount, 0);
            const isRowHovered = hoveredRowId === row.id;
            const maxInRow = isRowHovered ? Math.max(...row.cells.map((cell) => cell.amount)) : 0;

            return (
              <>
                <Row key={row.id}>
                  {row.cells.map((cell) => {
                    if (isRowHovered) {
                      // Обчислення відсотка для клітинки (відносно суми рядка)
                      const cellPercent = ((cell.amount / sumRow) * 100).toFixed(0);
                      // Теплова карта – фон залежить від відношення до максимального значення
                      const heatRatio = cell.amount / maxInRow;
                      return (
                        <td
                          key={cell.id}
                          style={{
                            border: "1px solid #ccc",
                            backgroundColor: `rgba(148,255,0, ${heatRatio})`,
                          }}
                        >
                          {cellPercent}%
                        </td>
                      );
                    } else {
                      return <Cell key={cell.id} isHighlighted={highlightedIds.has(cell.id)} {...cell} />;
                    }
                  })}
                  <td
                    className={s.tableSum}
                    onMouseEnter={() => handleSumMouseEnter(row.id)}
                    onMouseLeave={handleSumMouseLeave}
                  >
                    {sumRow}
                  </td>
                </Row>
              </>
            );
          })}
          <Row className={s.tablePercentage}>
            {columnMedians.map((median, i) => (
              <td key={i}>{median}</td>
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
