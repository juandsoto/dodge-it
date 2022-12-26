import { Matrix, OBJECTS, ObjectValues, Position } from "types";
import { randomNumber } from "utils";

function linearCongruentialGenerator() {
  let xn = 7;
  return (max = 10) => {
    const number = (1 * xn + 7) % max;
    xn = number;
    return number;
  };
}

export const LCG = linearCongruentialGenerator();

export function createGame() {
  const game: Matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const y: [number, number] = randomNumber(2) < 1 ? [0, 9] : [9, 0];
  const playerPosition: Position = { x: randomNumber(10), y: y[0] };
  const goalPosition: Position = { x: randomNumber(10), y: y[1] };
  game[playerPosition.x][playerPosition.y] = OBJECTS.PLAYER;
  game[goalPosition.x][goalPosition.y] = OBJECTS.GOAL;

  return game;
}

export function findPlayer(game: Matrix): Position {
  for (let x in game) {
    for (let y in game[x]) {
      if (game[x][y] === OBJECTS.PLAYER) return { x: Number(x), y: Number(y) };
    }
  }
  throw new Error("Player not found");
}

export function outOfMap(coordinate: number) {
  return coordinate < 0 || coordinate > 9;
}

function isBlank(object: ObjectValues): boolean {
  return object === OBJECTS.BLANK;
}

export function generateObstacle(game: Matrix): Position {
  let x: number;
  let y: number;
  do {
    x = randomNumber();
    y = randomNumber();
  } while (!isBlank(game[x][y]));
  return { x, y };
}
