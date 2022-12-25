import { mountStoreDevtool } from "simple-zustand-devtools";
import { DynamicObject, Matrix, ObjectKeys, OBJECTS, Position, RandomObjects } from "types";
import { createGame } from "utils/algorithms";
import create from "zustand";

interface Store {
  playerPosition: Position;
  setPlayerPosition: (position: Position) => void;
  movePlayerTo: (direction: keyof Position, cells: number) => void;
  canMovePlayer: boolean;
  setCanMovePlayer: (canMove: boolean) => void;
  game: Matrix;
  updateGame: (prev: Position | null, next: Position, object: ObjectKeys | RandomObjects) => void;
  dynamicObjects: Position[];
  addDynamicObject: (position: Position) => void;
  replaceDynamicObject: (prev: Position | null, next: Position) => void;
}

const useStore = create<Store>((set, get) => ({
  playerPosition: {} as Position,
  setPlayerPosition: position => set({ playerPosition: position }),
  movePlayerTo: (direction, cells) => {
    const { playerPosition, updateGame } = get();
    updateGame(playerPosition, { ...playerPosition, [direction]: playerPosition[direction] + cells }, "PLAYER");
  },
  canMovePlayer: true,
  setCanMovePlayer: canMove => set({ canMovePlayer: canMove }),
  dynamicObjects: [],
  addDynamicObject: position => set(state => ({ ...state, dynamicObjects: [...state.dynamicObjects, position] })),
  replaceDynamicObject: (prev, next) => {
    const { dynamicObjects, updateGame, game } = get();
    if (!prev) return;
    const newDynamicObjects = dynamicObjects.map(pos => (pos.x === prev.x && pos.y === prev.y ? next : pos));
    set({ dynamicObjects: newDynamicObjects });

    const object = Object.keys(OBJECTS).find(
      object => OBJECTS[object as ObjectKeys] === game[prev.x][prev.y]
    ) as ObjectKeys;

    updateGame(prev, next, object);
  },
  game: createGame(),
  updateGame: (prev, next, object) => {
    const newGame = [...get().game];
    if (!prev) {
      newGame[next.x][next.y] = OBJECTS[object as ObjectKeys];
    } else {
      newGame[prev.x][prev.y] = OBJECTS.BLANK;
      newGame[next.x][next.y] = OBJECTS[object as ObjectKeys];
    }

    if (object === "PLAYER") return set({ game: newGame, playerPosition: next });

    const dynamicObjects: DynamicObject[] = ["PERSON1", "PERSON2"];
    if (!prev && (dynamicObjects as string[]).includes(object)) {
      get().addDynamicObject(next);
    }

    return set({ game: newGame });
  },
}));

mountStoreDevtool("Store", useStore);

export default useStore;
