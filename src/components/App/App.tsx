import { useState, useRef, useEffect } from "react";

import BoardComponent from "../Board/BoardComponent";

import Board from "../../models/Board";
import Player from "../../models/Player";
import Colors from "../../enums/Colors";
import LostFigures from "../LostFigures/LostFigures";
import Popup from "../Popup/Popup";
import Timer from "../Timer/Timer";

import "./App.css";

const App = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE));
  const [blackPlayer] = useState<Player>(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);
  const [gameIsRunning, setGameIsRunning] = useState<boolean | null>(null);

  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupText, setPopupText] = useState("");

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setGameIsRunning(true);
    resetTimer();
  };

  const swapPlayer = () => {
    currentPlayer?.color === Colors.WHITE
      ? setCurrentPlayer(blackPlayer)
      : setCurrentPlayer(whitePlayer);
  };

  const resetTimer = () => {
    setBlackTime(300);
    setWhiteTime(300);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  const startTimer = () => {
    // Останавливаем таймер предыдущего игрока
    stopTimer();
    const callback =
      currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  };

  const decrement = (prev: number) => {
    if (prev !== 0) {
      return prev - 1;
    } else {
      timer.current && clearInterval(timer.current);
      setPopupText(
        `Время истекло! Победили - ${currentPlayer?.color === Colors.WHITE ? "черные" : "белые"}`
      );
      setPopupIsOpen(true);
      return prev;
    }
  };

  const decrementBlackTimer = () => {
    setBlackTime((prev) => decrement(prev));
  };

  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => decrement(prev));
  };

  return (
    <div className="chess">
      <h1 className="chess__title">React-Chess</h1>
      {gameIsRunning ? (
        <div className="chess__box">
          <p className="chess__player-turn">
            Ходят: {currentPlayer?.color === Colors.WHITE ? "белые" : "черные"}
          </p>
          <div className="chess__wrapper">
            <BoardComponent
              board={board}
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              swapPlayer={swapPlayer}
              setPopupIsOpen={setPopupIsOpen}
              setPopupText={setPopupText}
              stopTimer={stopTimer}
            />
            <div className="chess__statistics">
              <LostFigures title="Статистика черных фигур" figures={board.lostBlackFigures} />
              <Timer whiteTime={whiteTime} blackTime={blackTime} />
              <LostFigures title="Статистика белых фигур" figures={board.lostWhiteFigures} />
            </div>
          </div>
          <button className="chess__button" onClick={restart}>
            Перезапустить игру
          </button>
        </div>
      ) : (
        <button className="chess__button" onClick={restart}>
          Начать игру
        </button>
      )}
      <Popup
        popupIsOpen={popupIsOpen}
        setPopupIsOpen={setPopupIsOpen}
        restart={restart}
        popupText={popupText}
      ></Popup>
    </div>
  );
};

export default App;
