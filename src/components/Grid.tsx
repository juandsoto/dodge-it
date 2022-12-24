import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import useStore from "store";
import { findPlayer } from "utils/algorithms";
import Cell from "./Cell";

const Grid = (): JSX.Element => {
  const { game, setPlayerPosition, movePlayerTo, canMovePlayer, setCanMovePlayer } = useStore();
  const canMoveRef = useRef(canMovePlayer);

  const setCanMove = (canMove: boolean) => {
    canMoveRef.current = canMove;
    setCanMovePlayer(canMove);
  };

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
      setCanMove(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [canMovePlayer]);

  const onMove = (e: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key)) return;
    if (!canMoveRef.current) return false;

    const moves: Record<typeof e.key, () => ReturnType<typeof movePlayerTo>> = {
      ArrowLeft: () => movePlayerTo("y", -1),
      ArrowUp: () => movePlayerTo("x", -1),
      ArrowRight: () => movePlayerTo("y", 1),
      ArrowDown: () => movePlayerTo("x", 1),
    };
    moves[e.key]();

    setCanMove(false);
  };

  return (
    <div className="game__grid">
      {game.map((row, x) => row.map((col, y) => <Cell key={nanoid()} value={game[x][y]} position={{ x, y }} />))}
    </div>
  );
};

export default Grid;
