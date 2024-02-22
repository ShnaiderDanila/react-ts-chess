import { FC } from "react";

import "./Timer.css";

interface TimerProps {
  blackTime: number;
  whiteTime: number;
}

const Timer: FC<TimerProps> = ({ blackTime, whiteTime }) => {
  return (
    <div className="timer">
      <h1>Таймер</h1>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  );
};

export default Timer;
