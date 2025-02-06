import { clsx } from "clsx";
import s from "./Row.module.css";

type RowProps = {
  children: React.ReactNode;
  className?: string;
};

const Row = ({ children, className }: RowProps) => {
  return <tr className={clsx(className, s.row)}>{children}</tr>;
};

export default Row;
