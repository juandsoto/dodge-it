import { ObjectKeys } from "types";

export const randomObjects: ObjectKeys[] = ["PERSON1", "PERSON2", "CRACK"];

export function getRandomObject(): ObjectKeys {
  return randomObjects[Math.floor(Math.random() * 3)];
}
