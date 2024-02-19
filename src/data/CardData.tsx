/* eslint-disable @typescript-eslint/no-explicit-any */
import { Set, mappedSet } from "../data/SetData"

export interface PokeCard {
  id: string,
  name: string,
  supertype: string,
  subtypes: string[],
  hp: string,
  types: string[],
  set: Set,
  rarity: string,
  images: string,
}

export const mappedPokeCard = (item: any) => {
  return {
    id: item.id,
    name: item.name,
    supertype: item.supertype,
    subtypes: item.subtypes,
    hp: item.hp,
    types: item.types,
    set: mappedSet(item.set),
    rarity: item.rarity,
    images: item.images
  }
}