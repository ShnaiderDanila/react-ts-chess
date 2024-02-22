import Colors from "../../enums/Colors";
import FigureNames from "../../enums/FigureNames";

import Figure from "./Figure";
import Cell from "../Cell";

import blackIcon from "../../assets/black-knight.png";
import whiteIcon from "../../assets/white-knight.png";

class Knight extends Figure {
  constructor(cell: Cell, color: Colors) {
    super(cell, color);
    this.icon = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.KNIGHT;
  }
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    return this.cell.isKnightAttack(target);
  }
}

export default Knight;
