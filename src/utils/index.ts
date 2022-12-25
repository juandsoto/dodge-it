import { Matrix, OBJECTS, Position, RandomObjects } from "types";
import { randomNumber } from "./algorithms";

export const randomObjects: RandomObjects[] = ["PERSON1", "PERSON2", "CRACK"];

export function getRandomObject(): RandomObjects {
  return randomObjects[Math.floor(Math.random() * 3)];
}

export function getRandomMove(game: Matrix, position: Position): Position | null {
  const moves = getMoves(position);
  const availableMoves = moves.filter(move => game[move.x][move.y] === OBJECTS.BLANK);
  if (!availableMoves.length) return null;
  const index = randomNumber(availableMoves.length);
  return availableMoves[index];
}

function getMoves({ x, y }: Position): Position[] {
  const left: Position = { x, y: y - 1 };
  const up: Position = { x: x - 1, y };
  const right: Position = { x, y: y + 1 };
  const down: Position = { x: x + 1, y };
  return [left, up, right, down].filter(move => move.x >= 0 && move.x < 10 && move.y >= 0 && move.y < 10);
}
