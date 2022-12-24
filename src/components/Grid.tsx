import { useReference } from "hooks";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import useStore from "store";
import { findPlayer, outOfMap } from "utils/algorithms";
import Cell from "./Cell";

const Grid = (): JSX.Element => {
  const { game, playerPosition, setPlayerPosition, movePlayerTo, canMovePlayer, setCanMovePlayer } = useStore();
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
