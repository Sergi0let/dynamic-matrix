import { Cell, Matrix } from "../types";

export function findClosestCells(matrix: Matrix, hoveredCell: Cell, x: number): Set<string> {
  const allCells = matrix.flatMap((row) => row.cells);

  // Фільтруємо, щоб не враховувати ту клітинку, на яку навели курсор (опційно)
  const candidateCells = allCells.filter((cell) => cell.id !== hoveredCell.id);

  // Сортуємо за абсолютною різницею між значенням клітинки та hoveredCell.amount
  const sortedCells = candidateCells.sort(
    (a, b) => Math.abs(a.amount - hoveredCell.amount) - Math.abs(b.amount - hoveredCell.amount)
  );

  // Вибираємо перші X клітинок
  const closestCells = sortedCells.slice(0, x);

  // Повертаємо набір id, що спрощує перевірку при рендері
  return new Set(closestCells.map((cell) => cell.id.toString()));
}
