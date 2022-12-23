import { TPosition } from "types";

interface Props {
  value: number;
  position: TPosition;
}

const Cell = ({ value, position }: Props): JSX.Element => {
  const { x, y } = position;
  return (
    <div className={`cell position__${position.x}-${position.y}`}>
      {x === 0 && y === 0 && <img className="car" src="car.gif" />}
      {x === 9 && y === 9 && <img className="goal" src="goal.gif" />}
      {x === 5 && y === 6 && <img className="man" src="man.gif" />}
      {x === 4 && y === 8 && <img className="crack" src="crack.png" />}
    </div>
  );
};

export default Cell;
