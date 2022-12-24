export type Object = "PLAYER" | "GOAL" | "PERSON1" | "PERSON2" | "CRACK" | "BLANK";

export const OBJECTS: Record<Object, number> = {
  BLANK: 0,
  PLAYER: 1,
  GOAL: 2,
  CRACK: 3,
  PERSON1: 4,
  PERSON2: 5,
};
