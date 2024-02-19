/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSetsApiUrl } from "./API"
import { PokeCard, mappedPokeCard } from "../data/CardData"
import axios from "axios"

export const getSets = async ({ id, onSuccess, onFailed }: { id: string, onSuccess: any, onFailed: any }) => {
  try {
    const response = await axios.get(getSetsApiUrl(id));
    const data = await response.data;
    const cards: PokeCard[] = data.users.map((item: any) => mappedPokeCard(item));
    return onSuccess(cards);
  } catch (error) {
    console.error('Error fetching data:', error);
    onFailed(error);
  }
};