import { Matrix, OBJECTS, Position } from "types";

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

function randomNumber(max: number = 10): number {
  return Math.floor(Math.random() * max);
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
