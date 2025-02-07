import { useMemo, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import useMatrixContext from "../../hooks/useMatrixContext"
import { CellType, MatrixType } from "../../types"
import { findClosestCells } from "../../utils"
import Cell from "../Cell"
import Row from "../Row"
import s from "./Table.module.css"
import TableRow from "./TableRow"

const Table = () => {
  const { matrix, increaseCellAmount, matrixValues } = useMatrixContext();
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const { x: highlightedAmount } = matrixValues;
  const lastHoveredIdRef = useRef<string | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const getColumnMedians = (matrix: MatrixType): CellType[] => {
    if (matrix.length === 0) return [];

    const numColumns = matrix[0].cells.length;
    const medians: CellType[] = [];

    for (let col = 0; col < numColumns; col++) {
      const columnValues = matrix.map((row) => row.cells[col].amount);
      columnValues.sort((a, b) => a - b);

      const len = columnValues.length;
      const mid = Math.floor(len / 2);
      let median: number;

      if (len % 2 === 0) {
        median = (columnValues[mid - 1] + columnValues[mid]) / 2;
      } else {
        median = columnValues[mid];
      }
      medians.push({ amount: median, id: uuidv4() });
    }

    return medians;
  };
  const mediansData = useMemo(() => getColumnMedians(matrix), [matrix]);

  const handleIncreaseAmount = (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
    e.preventDefault();

    const cell = e.target as HTMLTableCellElement;
    const cellId = cell.getAttribute("data-cell-id");

    if (!cellId) return;
    increaseCellAmount(cellId);
  };

  const handleHighlightedCell = (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
    if (highlightedAmount === 0) return;

    const target = e.target as HTMLTableCellElement;

    if (target.tagName !== "TD" || !target.dataset.cellId) return;

    const cellId = target.getAttribute("data-cell-id");

    if (lastHoveredIdRef.current === cellId) return;

    lastHoveredIdRef.current = cellId;

    const allCells: CellType[] = matrix.flatMap((row) => row.cells);
    const hoveredCell = allCells.find((cell) => cell.id === cellId);

    if (hoveredCell) {
      const closestIds = findClosestCells(matrix, hoveredCell, highlightedAmount);
      setHighlightedIds(closestIds);
    }
  };

  const handleResetHighlightedCell = () => {
    setHighlightedIds(new Set());
    lastHoveredIdRef.current = null;
  };

  const handleHighlighteRow = (rowId: string) => setHoveredRowId(rowId);

  const handleResetHighlighteRow = () => setHoveredRowId(null);

  return (
    <div className={s.wrapper}>
      <table>
        <tbody
          onClick={handleIncreaseAmount}
          onMouseMove={handleHighlightedCell}
          onMouseLeave={handleResetHighlightedCell}
        >
          {matrix.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              hoveredRowId={hoveredRowId}
              handleHighlighteRow={handleHighlighteRow}
              handleResetHighlighteRow={handleResetHighlighteRow}
              highlightedIds={highlightedIds}
            />
          ))}
          <Row key={uuidv4()} className={s.tablePercentage}>
            {mediansData.map(({ id, amount }) => (
              <Cell key={id} amount={amount} id={id} />
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
