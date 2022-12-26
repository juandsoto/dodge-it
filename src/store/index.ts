import { mountStoreDevtool } from "simple-zustand-devtools";
import { DynamicObject, Matrix, ObjectKeys, OBJECTS, Position, RandomObjects } from "types";
import { createGame } from "utils/algorithms";
import create from "zustand";

type Crash = { object: number; crack: number };

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
  removeDynamicObject: (position: Position) => void;
  replaceDynamicObject: (prev: Position | null, next: Position) => void;
  cracks: Position[];
  addCrack: (position: Position) => void;
  crashes: Crash;
  newCrash: (type: keyof Crash) => void;
  isOver: { hasWin: boolean; message: string };
  setIsOver: ({ hasWin, message }: { hasWin: boolean; message: string }) => void;
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
  removeDynamicObject: position => {
    const newDynamicObjects = get().dynamicObjects.filter(pos => !(pos.x === position.x && pos.y === position.y));
    set({ dynamicObjects: newDynamicObjects });
  },
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
  cracks: [],
  addCrack: position => set(state => ({ cracks: [...state.cracks, position] })),
  crashes: { object: 0, crack: 0 },
  newCrash: type => {
    if (type === "object") {
      return set(state => ({ crashes: { object: state.crashes.object + 1, crack: state.crashes.crack } }));
    }
    if (type === "crack") {
      return set(state => ({ crashes: { crack: state.crashes.crack + 1, object: state.crashes.object } }));
    }
  },
  isOver: { hasWin: false, message: "" },
  setIsOver: isOver => set({ isOver }),
  game: createGame(),
  updateGame: (prev, next, object) => {
    const newGame: Matrix = [...get().game];
    if (!prev) {
      newGame[next.x][next.y] = OBJECTS[object as ObjectKeys];
      const dynamicObjects: DynamicObject[] = ["PERSON1", "PERSON2"];
      if ((dynamicObjects as string[]).includes(object)) {
        get().addDynamicObject(next);
      }
      if (object === "CRACK") {
        get().addCrack(next);
      }
      return set({ game: newGame });
    }
    if (object === "PLAYER") {
      if (newGame[next.x][next.y] === OBJECTS.PERSON1 || newGame[next.x][next.y] === OBJECTS.PERSON2) {
        get().removeDynamicObject(next);
        get().newCrash("object");
      }
      if (newGame[next.x][next.y] === OBJECTS.CRACK) {
        get().newCrash("crack");
      }
      if (newGame[next.x][next.y] === OBJECTS.GOAL) {
        get().setIsOver({ hasWin: true, message: "You are home!" });
      }
      const overCrack = !!get().cracks.find(crack => crack.x === prev.x && crack.y === prev.y);
      newGame[prev.x][prev.y] = overCrack ? OBJECTS.CRACK : OBJECTS.BLANK;
      newGame[next.x][next.y] = OBJECTS[object as ObjectKeys];
      return set({ game: newGame, playerPosition: next });
    }

    newGame[prev.x][prev.y] = OBJECTS.BLANK;
    newGame[next.x][next.y] = OBJECTS[object as ObjectKeys];
    return set({ game: newGame });
  },
}));

mountStoreDevtool("Store", useStore);

export default useStore;
