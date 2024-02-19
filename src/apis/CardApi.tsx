/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCardsApiUrl } from "../apis/API"
import { PokeCard, mappedPokeCard } from "../data/CardData"
import axios from "axios"

export interface QueryParams {
  page: string,
  pageSize: string,
  orderBy: string,
  select: string
}

export const getCards = async ({ queryParams, onSuccess, onFailed }: { queryParams: QueryParams, onSuccess: any, onFailed: any }) => {
  try {
    const response = await axios.get(
      `${getCardsApiUrl}
      ?page=${queryParams.page}
      &pageSize=${queryParams.pageSize}
      &orderBy=${queryParams.orderBy}
      &select=${queryParams.select}`
    );
    const data = await response.data;
    const cards: PokeCard[] = data.users.map((item: any) => mappedPokeCard(item));
    return onSuccess(cards);
  } catch (error) {
    console.error('Error fetching data:', error);
    onFailed(error);
  }
};