import FigureNames from "../../enums/FigureNames";
import Colors from "../../enums/Colors";

import Figure from "./Figure";
import Cell from "../Cell";

import blackIcon from "../../assets/black-queen.png";
import whiteIcon from "../../assets/white-queen.png";

class Queen extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(cell, color);
    this.icon = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.QUEEN;
  }
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target)) {
      return true;
    }

    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}

export default Queen;
