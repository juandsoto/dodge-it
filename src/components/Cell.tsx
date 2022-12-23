import { TPosition } from "types";

interface Props {
  value: number;
  position: TPosition;
}

const Cell = ({ value, position }: Props): JSX.Element => {
  const { x, y } = position;
  return (
    <div className={`cell position__${position.x}-${position.y}`}>
      {x === 0 && y === 0 && <img className="object car" src="car.svg" />}
      {x === 9 && y === 9 && <img className="object goal" src="goal.svg" />}
      {x === 5 && y === 6 && <img className="object man" src="person1.svg" />}
      {x === 2 && y === 3 && <img className="object man" src="person2.svg" />}
      {x === 4 && y === 8 && <img className="object crack" src="crack.png" />}
    </div>
  );
};

export default Cell;
