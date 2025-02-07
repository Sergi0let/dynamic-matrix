import { CellType, MatrixType } from "../types";

export function findClosestCells(matrix: MatrixType, hoveredCell: CellType, x: number): Set<string> {
  const allCells = matrix.flatMap((row) => row.cells);
  const candidateCells = allCells.filter((cell) => cell.id !== hoveredCell.id);
  const sortedCells = candidateCells.sort(
    (a, b) => Math.abs(a.amount - hoveredCell.amount) - Math.abs(b.amount - hoveredCell.amount)
  );
  const closestCells = sortedCells.slice(0, x);

  return new Set(closestCells.map((cell) => cell.id.toString()));
}
