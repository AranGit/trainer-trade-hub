/* eslint-disable @typescript-eslint/no-explicit-any */
import { Set, mappedSet } from "../data/SetData"


export interface Poke {
  id: string,
  name: string,
  supertype: string,
  subtypes: string[],
  hp: string,
  types: string[],
  set: Set,
  rarity: string,
  images: {
    large: string,
    small: string
  },
  price: number,
  amount: number
}

export interface Cards {
  data: Poke[],
  page: number,
  pageSize: number,
  count: number,
  totalCount: number
}

export const mappedPoke = (item: any) => {
  return {
    id: item.id,
    name: item.name,
    supertype: item.supertype,
    subtypes: item.subtypes,
    hp: item.hp,
    types: item.types,
    set: mappedSet(item.set),
    rarity: item.rarity,
    images: item.images,
    price: (Math.random() * 1000),
    amount: Math.floor(Math.random() * 20)
  }
}

export const mappedCards = (item: any) => {
  return {
    data: item.data.map((item: any) => mappedPoke(item)),
    page: item.page,
    pageSize: item.pageSize,
    count: item.count,
    totalCount: item.totalCount
  }
}

export const getUnDuplicatedPoke = (pokeList: Poke[]) => {
  const unduplicatedPokeList: Poke[] = [];
  pokeList.map((poke: Poke) => {
    if (!unduplicatedPokeList.find((unduplicatedPoke: Poke) => unduplicatedPoke.id === poke.id)) {
      unduplicatedPokeList.push(poke)
    }
  })
  return unduplicatedPokeList;
}
