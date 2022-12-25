import useStore from "store";
import { OBJECTS, ObjectValues, Position } from "types";

interface Props {
  value: number;
  position: Position;
}

const Cell = ({ value, position }: Props): JSX.Element => {
  const { x, y } = position;
  const { canMovePlayer } = useStore();

  const SPRITES: Record<ObjectValues, JSX.Element | null> = {
    [OBJECTS.BLANK]: null,
    [OBJECTS.PLAYER]: <img className={["object car", canMovePlayer ? "" : "bg-red-500"].join(" ")} src="car.svg" />,
    [OBJECTS.GOAL]: <img className="object goal" src="goal.svg" />,
    [OBJECTS.PERSON1]: <img className="object man scale-75" src="person1.svg" />,
    [OBJECTS.PERSON2]: <img className="object man py-1" src="person2.svg" />,
    [OBJECTS.CRACK]: <img className="object crack" src="crack.svg" />,
  };

  return <div className={`cell position__${x}-${y}`}>{SPRITES[value]}</div>;
};

export default Cell;
