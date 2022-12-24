export const OBJECTS: Record<ObjectKeys, number> = {
  BLANK: 0,
  PLAYER: 1,
  GOAL: 2,
  CRACK: 3,
  PERSON1: 4,
  PERSON2: 5,
};

export type ObjectKeys = "PLAYER" | "GOAL" | "PERSON1" | "PERSON2" | "CRACK" | "BLANK";

export type ObjectValues = typeof OBJECTS[keyof typeof OBJECTS];
