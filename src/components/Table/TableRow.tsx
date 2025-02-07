import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { RowType } from "../../types";
import Cell from "../Cell";
import Row from "../Row";
import s from "./Table.module.css";

type TableRowProps = {
  row: RowType;
  hoveredRowId: string | null;
  handleHighlighteRow: (rowId: string) => void;
  handleResetHighlighteRow: () => void;
  highlightedIds: Set<string>;
};

const TableRow = ({
  row,
  hoveredRowId,
  handleHighlighteRow,
  handleResetHighlighteRow,
  highlightedIds,
}: TableRowProps) => {
  const sumRow = useMemo(() => row.cells.reduce((acc, cell) => acc + cell.amount, 0), [row.cells]);
  const isRowHovered = hoveredRowId === row.id;
  const maxInRow = useMemo(
    () => (isRowHovered ? Math.max(...row.cells.map((cell) => cell.amount)) : 0),
    [isRowHovered, row.cells]
  );

  return (
    <Row key={row.id}>
      {row.cells.map((cell) => {
        if (isRowHovered) {
          const cellPercent = ((cell.amount / sumRow) * 100).toFixed(0);
          const heatRatio = cell.amount / maxInRow;
          const redValue = Math.round(255 * (1 - heatRatio));
          const greenValue = Math.round(255 * heatRatio);
          const cellBackgroundColor = `rgb(${redValue}, ${greenValue}, 0)`;

          return <Cell id={cell.id} key={cell.id} heatBg={cellBackgroundColor} amount={+cellPercent} />;
        } else {
          return <Cell key={cell.id} isHighlighted={highlightedIds.has(cell.id)} {...cell} />;
        }
      })}
      <Cell
        id={row.id}
        key={uuidv4()}
        className={s.tableSum}
        onMouseEnter={handleHighlighteRow.bind(null, row.id)}
        onMouseLeave={handleResetHighlighteRow}
        amount={sumRow}
      />
    </Row>
  );
};

export default TableRow;
