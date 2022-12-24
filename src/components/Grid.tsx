import { useReference } from "hooks";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import useStore from "store";
import { getRandomObject } from "utils";
import { findPlayer, generateObstacle, outOfMap, randomNumber } from "utils/algorithms";
import Cell from "./Cell";

const Grid = (): JSX.Element => {
  const { game, playerPosition, setPlayerPosition, movePlayerTo, canMovePlayer, setCanMovePlayer, updateGame } =
    useStore();
  const { ref: canMovePlayerRef } = useReference(canMovePlayer);
  const { ref: playerPositionRef } = useReference(playerPosition);

  useEffect(() => {
    setPlayerPosition(findPlayer(game));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onMove);
    return () => document.removeEventListener("keydown", onMove);
  }, []);

  useEffect(() => {
    if (canMovePlayer) return;
    const timeout: number = setTimeout(() => {
      setCanMovePlayer(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [canMovePlayer]);

  useEffect(() => {
    const minObstacles: number = 10;
    let iterations: number = randomNumber(20) + minObstacles;
    const interval = setInterval(() => {
      if (iterations === 1) clearInterval(interval);
      const randomObject = getRandomObject();
      updateGame(null, generateObstacle(game), randomObject);
      iterations--;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const onMove = (e: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key)) return;
    if (!canMovePlayerRef.current) return;

    const isOutOfMap: Record<typeof e.key, () => ReturnType<typeof outOfMap>> = {
      ArrowLeft: () => outOfMap(playerPositionRef.current.y - 1),
      ArrowUp: () => outOfMap(playerPositionRef.current.x - 1),
      ArrowRight: () => outOfMap(playerPositionRef.current.y + 1),
      ArrowDown: () => outOfMap(playerPositionRef.current.x + 1),
    };

    if (isOutOfMap[e.key]()) return;

    const moves: Record<typeof e.key, () => ReturnType<typeof movePlayerTo>> = {
      ArrowLeft: () => movePlayerTo("y", -1),
      ArrowUp: () => movePlayerTo("x", -1),
      ArrowRight: () => movePlayerTo("y", 1),
      ArrowDown: () => movePlayerTo("x", 1),
    };

    moves[e.key]();

    setCanMovePlayer(false);
  };

  return (
    <div className="game__grid">
      {game.map((row, x) => row.map((col, y) => <Cell key={nanoid()} value={game[x][y]} position={{ x, y }} />))}
    </div>
  );
};

export default Grid;
