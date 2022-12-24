import useStore from "store";
import { OBJECTS, Position } from "types";

interface Props {
  value: number;
  position: Position;
}

const Cell = ({ value, position }: Props): JSX.Element => {
  const { x, y } = position;
  const { canMovePlayer } = useStore();

  const SPRITES: Record<typeof OBJECTS[keyof typeof OBJECTS], JSX.Element | null> = {
    [OBJECTS.BLANK]: null,
    [OBJECTS.PLAYER]: <img className={["object car", canMovePlayer ? "" : "bg-red-500"].join(" ")} src="car.svg" />,
    [OBJECTS.GOAL]: <img className="object goal" src="goal.svg" />,
    [OBJECTS.PERSON1]: <img className="object man" src="person1.svg" />,
    [OBJECTS.PERSON2]: <img className="object man" src="person2.svg" />,
    [OBJECTS.CRACK]: <img className="object crack" src="crack.png" />,
  };

  return <div className={`cell position__${x}-${y}`}>{SPRITES[value]}</div>;
};

export default Cell;
