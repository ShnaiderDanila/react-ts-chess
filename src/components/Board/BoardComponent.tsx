import { FC, useEffect, useState } from "react";

import Player from "../../models/Player";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import CellComponent from "../Cell/CellComponent";
import FigureNames from "../../enums/FigureNames";
import Colors from "../../enums/Colors";

import { chessLetters } from "../../utils/constants";

import "./BoardComponents.css";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setPopupIsOpen: (arg: boolean) => void;
  setPopupText: (arg: string) => void;
  stopTimer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  setPopupIsOpen,
  setPopupText,
  stopTimer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  // Логика хода игрока
  const click = (cell: Cell) => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell) &&
      cell.figure?.name !== FigureNames.KING
    ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      board.isCellUnderAttack(currentPlayer?.color);
      board.isKingUnderAttack();
      if (board.checkEndgame(currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE)) {
        setPopupIsOpen(true);
        setPopupText(`Победили ${currentPlayer?.color === Colors.WHITE ? "белые" : "черные"}`);
        stopTimer();
      } else {
        swapPlayer();
      }
    } else if (cell.figure && cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const hightlightCells = () => {
    board.hightlightCells(selectedCell);
    updateBoard();
  };

  useEffect(() => {
    hightlightCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);

  return (
    <div className="board-container">
      <div className="board">
        {board.cells.map((cellRow) => {
          return cellRow.map((cell) => (
            <CellComponent
              click={click}
              key={cell.id}
              cell={cell}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            />
          ));
        })}
      </div>
      <div className="top-border">
        {chessLetters.map((letter, index) => {
          return <span key={index}>{letter}</span>;
        })}
      </div>
      <div className="bottom-border">
        {chessLetters.map((letter, index) => {
          return <span key={index}>{letter}</span>;
        })}
      </div>
      <div className="left-border">
        {board.cells
          .map((_cellRow, index) => {
            return <span key={index}>{index + 1}</span>;
          })
          .reverse()}
      </div>
      <div className="right-border">
        {board.cells
          .map((_cellRow, index) => {
            return <span key={index}>{index + 1}</span>;
          })
          .reverse()}
      </div>
    </div>
  );
};

export default BoardComponent;
