import Colors from "../../enums/Colors";
import FigureNames from "../../enums/FigureNames";

import Cell from "../Cell";
import Figure from "./Figure";

import blackIcon from "../../assets/black-king.png";
import whiteIcon from "../../assets/white-king.png";

class King extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(cell, color);
    this.icon = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.KING;
  }
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const stepDirection = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);

    if (
      (target.y === this.cell.y + stepDirection && target.x === this.cell.x) ||
      (target.y === this.cell.y - stepDirection && target.x === this.cell.x) ||
      (target.y === this.cell.y && target.x === this.cell.x + 1) ||
      (target.y === this.cell.y && target.x === this.cell.x - 1) ||
      (absY === 1 && absX === 1)
    ) {
      return !target.underAtack;
    }

    return false;
  }
}

export default King;
