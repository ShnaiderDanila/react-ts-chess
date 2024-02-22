import { FC } from "react";

import Figure from "../../models/figures/Figure";

import "./LostFigures.css";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost-figures">
      <h3 className="lost-figures__subtitle">{title}</h3>
      <ul className="lost-figures__list">
        {figures.map(
          (figure) =>
            figure.icon && (
              <img
                key={figure.id}
                src={figure.icon}
                alt={figure.name}
                className="lost-figures__img"
              />
            )
        )}
      </ul>
    </div>
  );
};

export default LostFigures;
