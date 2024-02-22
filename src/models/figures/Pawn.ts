import Colors from "../../enums/Colors";
import FigureNames from "../../enums/FigureNames";

import Figure from "./Figure";
import Cell from "../Cell";

import blackIcon from "../../assets/black-pawn.png";
import whiteIcon from "../../assets/white-pawn.png";

class Pawn extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(cell, color);
    this.icon = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.PAWN;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const stepDirection = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    // Логика передвижения пешки
    if (
      (target.y === this.cell.y + stepDirection ||
        (this.firstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(this.cell.x, this.cell.y + stepDirection).isEmpty() &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    // Логика атаки пешки
    if (
      target.y === this.cell.y + stepDirection &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }
}

export default Pawn;
