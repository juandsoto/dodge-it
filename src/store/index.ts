import { mountStoreDevtool } from "simple-zustand-devtools";
import { Matrix, OBJECTS, Position } from "types";
import { createGame, outOfMap } from "utils/algorithms";
import create from "zustand";

interface Store {
  playerPosition: Position;
  setPlayerPosition: (position: Position) => void;
  movePlayerTo: (direction: keyof Position, cells: number) => void;
  canMovePlayer: boolean;
  setCanMovePlayer: (canMove: boolean) => void;
  game: Matrix;
  updateGame: (previous: Position | null, next: Position, object: number) => void;
}

const useStore = create<Store>((set, get) => ({
  playerPosition: {} as Position,
  setPlayerPosition: position => set(state => ({ ...state, playerPosition: position })),
  movePlayerTo: (direction, cells) => {
    const { playerPosition, updateGame } = get();
    if (outOfMap(playerPosition[direction] + cells)) return;
    updateGame(playerPosition, { ...playerPosition, [direction]: playerPosition[direction] + cells }, OBJECTS.PLAYER);
  },
  canMovePlayer: true,
  setCanMovePlayer: canMove => set(state => ({ ...state, canMovePlayer: canMove })),
  game: createGame(),
  updateGame: (previous, next, object) => {
    const newGame = [...get().game];
    if (!previous) {
      newGame[next.x][next.y] = object;
    } else {
      newGame[previous.x][previous.y] = OBJECTS.BLANK;
      newGame[next.x][next.y] = object;
    }

    if (object === OBJECTS.PLAYER) return set(state => ({ ...state, game: newGame, playerPosition: next }));

    return set(state => ({ ...state, game: newGame }));
  },
}));

mountStoreDevtool("Store", useStore);

export default useStore;
