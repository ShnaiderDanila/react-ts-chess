import Colors from "../enums/Colors";

import Cell from "./Cell";

import Queen from "./figures/Queen";
import Bishop from "./figures/Bishop";
import Knight from "./figures/Knight";
import Pawn from "./figures/Pawn";
import King from "./figures/King";
import Rook from "./figures/Rook";
import Figure from "./figures/Figure";
import FigureNames from "../enums/FigureNames";

class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = [];

      for (let x = 0; x < 8; x++) {
        (y + x) % 2 !== 0
          ? row.push(new Cell(this, x, y, Colors.BLACK, null))
          : row.push(new Cell(this, x, y, Colors.WHITE, null));
      }

      this.cells.push(row);
    }
  }

  public hightlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const targetCell = row[j];
        targetCell.available = !!selectedCell?.figure?.canMove(targetCell);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    return newBoard;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(this.getCell(i, 1), Colors.BLACK);
      new Pawn(this.getCell(i, 6), Colors.WHITE);
    }
  }
  private addKings() {
    new King(this.getCell(4, 7), Colors.WHITE);
    new King(this.getCell(4, 0), Colors.BLACK);
  }
  private addQueens() {
    new Queen(this.getCell(3, 0), Colors.BLACK);
    new Queen(this.getCell(3, 7), Colors.WHITE);
  }
  private addBishops() {
    new Bishop(this.getCell(2, 0), Colors.BLACK);
    new Bishop(this.getCell(5, 0), Colors.BLACK);
    new Bishop(this.getCell(2, 7), Colors.WHITE);
    new Bishop(this.getCell(5, 7), Colors.WHITE);
  }

  private addKnights() {
    new Knight(this.getCell(1, 0), Colors.BLACK);
    new Knight(this.getCell(6, 0), Colors.BLACK);
    new Knight(this.getCell(1, 7), Colors.WHITE);
    new Knight(this.getCell(6, 7), Colors.WHITE);
  }

  private addRooks() {
    new Rook(this.getCell(0, 0), Colors.BLACK);
    new Rook(this.getCell(7, 0), Colors.BLACK);
    new Rook(this.getCell(0, 7), Colors.WHITE);
    new Rook(this.getCell(7, 7), Colors.WHITE);
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addRooks();
    this.addKnights();
  }

  // Метод добавления съеденных фигур
  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure);
  }

  private findKings() {
    let blackKing: Cell = new Cell(this, 0, 0, Colors.BLACK, null);
    let whiteKing: Cell = new Cell(this, 0, 0, Colors.BLACK, null);
    this.cells.forEach((element) => {
      element.forEach((cell) => {
        if (cell.figure?.name === FigureNames.KING) {
          cell.figure.color === Colors.WHITE ? (whiteKing = cell) : (blackKing = cell);
        }
      });
    });
    return { whiteKing, blackKing };
  }

  public isKingUnderAttack() {
    const whiteKing = this.findKings().whiteKing;
    const blackKing = this.findKings().blackKing;
    if (whiteKing.figure) {
      whiteKing.figure.checked = false;
    }
    if (blackKing.figure) {
      blackKing.figure.checked = false;
    }
    this.cells.forEach((element) => {
      element.forEach((cell) => {
        if (cell.figure?.canMove(whiteKing) && whiteKing.figure) {
          whiteKing.figure.checked = true;
          return true;
        }
        if (cell.figure?.canMove(blackKing) && blackKing.figure) {
          blackKing.figure.checked = true;
          return true;
        }
      });
    });
  }

  // Логика проверки ячейки под атакой, для блокировки хода короля
  public isCellUnderAttack(color: Colors | undefined) {
    const figures: Figure[] = [];

    this.cells.forEach((element) => {
      element.forEach((cell) => {
        cell.underAtack = false;
        if (cell.figure && cell.figure.color === color) {
          figures.push(cell.figure);
        }
      });
    });

    figures.forEach((figure) => {
      this.cells.forEach((element) => {
        element.forEach((cell) => {
          if (figure.canMove(cell) && figure.name !== FigureNames.PAWN) {
            cell.underAtack = true;
          }

          if (
            figure.cell.isPawnAttack(cell) ||
            (figure.cell.isKnightAttack(cell) && figure.name === FigureNames.KNIGHT) ||
            (figure.cell.isEmptyVertical(cell) && figure.name === FigureNames.ROOK) ||
            (figure.cell.isEmptyVertical(cell) && figure.name === FigureNames.QUEEN)
          ) {
            cell.underAtack = true;
          }
        });
      });
    });
  }

  public checkEndgame(color: Colors | undefined) {
    let endGame = false;

    const king = color === Colors.WHITE ? this.findKings().whiteKing : this.findKings().blackKing;

    const cellsToEscape: Cell[] = [];

    this.cells.forEach((element) => {
      element.forEach((cell) => {
        if (king.figure?.canMove(cell)) {
          cellsToEscape.push(cell);
        }
      });
    });

    if (king.figure?.checked && cellsToEscape.length === 0) {
      endGame = true;
    }

    if (this.lostBlackFigures.length === 15 || this.lostWhiteFigures.length === 15) {
      endGame = true;
    }

    return endGame;
  }
}

export default Board;
