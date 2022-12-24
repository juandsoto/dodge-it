import useStore from "store";
import { outOfMap } from "utils/algorithms";
import Movement from "./Movement";

type Direction = "up" | "left" | "right" | "down";

const Movements = () => {
  const { canMovePlayer, playerPosition, movePlayerTo, setCanMovePlayer } = useStore();
  const onMove = (direction: Direction) => {
    if (!canMovePlayer) return;

    const isOutOfMap: Record<Direction, () => ReturnType<typeof outOfMap>> = {
      left: () => outOfMap(playerPosition.y - 1),
      up: () => outOfMap(playerPosition.x - 1),
      right: () => outOfMap(playerPosition.y + 1),
      down: () => outOfMap(playerPosition.x + 1),
    };

    if (isOutOfMap[direction]()) return;

    const moves: Record<Direction, () => ReturnType<typeof movePlayerTo>> = {
      left: () => movePlayerTo("y", -1),
      up: () => movePlayerTo("x", -1),
      right: () => movePlayerTo("y", 1),
      down: () => movePlayerTo("x", 1),
    };

    moves[direction]();

    setCanMovePlayer(false);
  };
  return (
    <>
      {/* big devices */}
      <div className="hidden lg:block absolute top-8 left-8">
        <div className="flex flex-col w-36 xl:w-48 aspect-square p-2">
          <div className="w-full text-center">
            <Movement className="arrow arrow--up" title="up" onClick={() => onMove("up")} />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <Movement className="arrow arrow--left" title="left" onClick={() => onMove("left")} />
            <Movement className="arrow arrow--right" title="right" onClick={() => onMove("right")} />
          </div>
          <div className="w-full text-center">
            <Movement className="arrow arrow--down" title="down" onClick={() => onMove("down")} />
          </div>
        </div>
      </div>
      {/* small devices */}
      <div className="lg:hidden flex gap-4 sm:gap-8">
        <Movement className="arrow arrow--left" title="left" onClick={() => onMove("left")} />
        <Movement className="arrow arrow--up" title="up" onClick={() => onMove("up")} />
        <Movement className="arrow arrow--right" title="right" onClick={() => onMove("right")} />
        <Movement className="arrow arrow--down" title="down" onClick={() => onMove("down")} />
      </div>
    </>
  );
};

export default Movements;
