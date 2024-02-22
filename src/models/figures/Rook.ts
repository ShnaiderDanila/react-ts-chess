import FigureNames from "../../enums/FigureNames";
import Colors from "../../enums/Colors";

import Figure from "./Figure";
import Cell from "../Cell";

import blackIcon from "../../assets/black-rook.png";
import whiteIcon from "../../assets/white-rook.png";

class Rook extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(cell, color);
    this.icon = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.ROOK;
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
    return false;
  }
}

export default Rook;
