import { FC } from "react";

import Cell from "../../models/Cell";
import FigureNames from "../../enums/FigureNames";

import "./CellComponent.css";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      onClick={() => click(cell)}
      className={`cell 
      cell_${cell.color} 
      ${selected && "cell_selected"} 
      ${
        cell.available && cell.figure && cell.figure.name !== FigureNames.KING && "cell_under-atack"
      }
      ${cell.figure?.checked && "cell_check"}`}
    >
      {cell.available && !cell.figure && <div className="cell__available-circle"></div>}
      {cell.figure?.icon && (
        <img className="cell__img" src={cell.figure.icon} alt={cell.figure.name}></img>
      )}
    </div>
  );
};

export default CellComponent;
