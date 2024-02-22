import Colors from "../../enums/Colors";
import FigureNames from "../../enums/FigureNames";

import icon from "../../assets/black-bishop.png";

import Cell from "../Cell";

// Базовый класс для всех фигур
class Figure {
  cell: Cell;
  color: Colors;
  icon: typeof icon | null;
  name: FigureNames;
  id: number;
  firstStep: boolean = true;
  checked: boolean = false;

  constructor(cell: Cell, color: Colors) {
    this.cell = cell;
    this.color = color;

    this.cell.figure = this;

    this.icon = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  // Метод общей логики движения фигур
  public canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    return true;
  }
}

export default Figure;
