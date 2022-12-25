import { useGame } from "hooks";
import { nanoid } from "nanoid";
import Cell from "./Cell";

const Grid = (): JSX.Element => {
  const { game } = useGame();

  return (
    <div className="game__grid">
      {game.map((row, x) => row.map((col, y) => <Cell key={nanoid()} value={game[x][y]} position={{ x, y }} />))}
    </div>
  );
};

export default Grid;
