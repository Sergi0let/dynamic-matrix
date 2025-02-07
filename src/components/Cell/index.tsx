import clsx from "clsx";
import s from "./Cell.module.css";

type CellProps = {
  id: string;
  amount: number;
  isHighlighted?: boolean;
  heatBg?: string;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLTableCellElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLTableCellElement>;
};
const Cell = ({ amount, id, isHighlighted, heatBg, className, onMouseEnter, onMouseLeave }: CellProps) => {
  if (onMouseEnter && onMouseLeave) {
    return (
      <td className={clsx(s.cell, className)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {amount}
      </td>
    );
  }
  if (heatBg) {
    return (
      <td className={clsx(s.cell, className)} style={{ backgroundColor: heatBg }}>
        {amount}%
      </td>
    );
  }
  return (
    <td
      data-cell-id={id}
      className={clsx(s.cell, { [s.highlighted]: isHighlighted }, className)}
      style={{
        backgroundColor: isHighlighted ? "#D4C66A" : "transparent",
        color: isHighlighted ? "#451054" : "inherit",
      }}
    >
      {amount}
    </td>
  );
};

export default Cell;
