import { useReference } from "hooks";
import { useEffect } from "react";
import useStore from "store";
import { getRandomMove, getRandomObject } from "utils";
import { findPlayer, generateObstacle, outOfMap, randomNumber } from "utils/algorithms";
import { OBJECTS_GENERATION_TIME, OBJECTS_UPDATE_TIME, PLAYER_FREEZE_TIME } from "utils/constants";

function useGame() {
  const {
    game,
    isOver,
    playerPosition,
    setPlayerPosition,
    movePlayerTo,
    canMovePlayer,
    setCanMovePlayer,
    updateGame,
    dynamicObjects,
    replaceDynamicObject,
  } = useStore();
  const { ref: canMovePlayerRef } = useReference(canMovePlayer);
  const { ref: playerPositionRef } = useReference(playerPosition);
  const { ref: dynamicObjectsRef } = useReference(dynamicObjects);
  const { ref: isOverRef } = useReference(isOver);

  useEffect(() => {
    setPlayerPosition(findPlayer(game));

    /**
     * Obstacle generation
     */
    const minObstacles: number = 8;
    let iterations: number = randomNumber(18) + minObstacles;
    const generationInterval = setInterval(() => {
      if (iterations === 1) clearInterval(generationInterval);
      const randomObject = getRandomObject();
      updateGame(null, generateObstacle(game), randomObject);
      iterations--;
    }, OBJECTS_GENERATION_TIME);

    /**
     * Obstacle coordinates update
     */
    const updateInterval = setInterval(() => {
      let objectsToMoveQty = randomNumber(dynamicObjectsRef.current.length) + 1;
      let alreadyInMovement: number[] = [];
      do {
        if (!dynamicObjectsRef.current.length) break;
        let index = randomNumber(dynamicObjectsRef.current.length);
        while (alreadyInMovement.includes(index)) {
          index = randomNumber(dynamicObjectsRef.current.length);
        }
        const randomMove = getRandomMove(game, dynamicObjectsRef.current[index]);
        objectsToMoveQty--;
        if (!randomMove) continue;
        replaceDynamicObject(dynamicObjectsRef.current[index], randomMove);
      } while (objectsToMoveQty > 0);
    }, OBJECTS_UPDATE_TIME);

    document.addEventListener("keydown", onMove);

    return () => {
      document.removeEventListener("keydown", onMove);
      clearInterval(generationInterval);
      clearInterval(updateInterval);
    };
  }, []);

  useEffect(() => {
    if (canMovePlayer) return;
    const timeout: number = setTimeout(() => {
      setCanMovePlayer(true);
    }, PLAYER_FREEZE_TIME);

    return () => clearTimeout(timeout);
  }, [canMovePlayer]);

  const onMove = (e: KeyboardEvent) => {
    if (isOverRef.current.hasWin) return;
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

  return {
    game,
  };
}

export default useGame;
