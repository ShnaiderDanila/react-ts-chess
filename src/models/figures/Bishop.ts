import Colors from "../../enums/Colors";
import FigureNames from "../../enums/FigureNames";

import Cell from "../Cell";
import Figure from "./Figure";

import blackIcon from "../../assets/black-bishop.png";
import whiteIcon from "../../assets/white-bishop.png";

class Bishop extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(cell, color);
    this.icon = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.BISHOP;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}

export default Bishop;
