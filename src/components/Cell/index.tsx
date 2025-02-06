import s from "./Cell.module.css";

type CellProps = {
  id: string;
  amount: number;
  isHighlighted: boolean;
};
const Cell = ({ amount, id, isHighlighted }: CellProps) => {
  return (
    <td
      data-cell-id={id}
      className={s.cell}
      style={{ backgroundColor: isHighlighted ? "yellow" : "transparent", color: isHighlighted ? "blue" : "inherit" }}
    >
      {amount}
    </td>
  );
};

export default Cell;
