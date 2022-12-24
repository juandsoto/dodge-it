import { mountStoreDevtool } from "simple-zustand-devtools";
import { Matrix, ObjectKeys, OBJECTS, Position } from "types";
import { createGame } from "utils/algorithms";
import create from "zustand";

interface Store {
  playerPosition: Position;
  setPlayerPosition: (position: Position) => void;
  movePlayerTo: (direction: keyof Position, cells: number) => void;
  canMovePlayer: boolean;
  setCanMovePlayer: (canMove: boolean) => void;
  game: Matrix;
  updateGame: (previous: Position | null, next: Position, object: ObjectKeys) => void;
}

const useStore = create<Store>((set, get) => ({
  playerPosition: {} as Position,
  setPlayerPosition: position => set(state => ({ ...state, playerPosition: position })),
  movePlayerTo: (direction, cells) => {
    const { playerPosition, updateGame } = get();
    updateGame(playerPosition, { ...playerPosition, [direction]: playerPosition[direction] + cells }, "PLAYER");
  },
  canMovePlayer: true,
  setCanMovePlayer: canMove => set(state => ({ ...state, canMovePlayer: canMove })),
  game: createGame(),
  updateGame: (previous, next, object) => {
    const newGame = [...get().game];
    if (!previous) {
      newGame[next.x][next.y] = OBJECTS[object];
    } else {
      newGame[previous.x][previous.y] = OBJECTS.BLANK;
      newGame[next.x][next.y] = OBJECTS[object];
    }

    if (object === "PLAYER") return set(state => ({ ...state, game: newGame, playerPosition: next }));

    return set(state => ({ ...state, game: newGame }));
  },
}));

mountStoreDevtool("Store", useStore);

export default useStore;
