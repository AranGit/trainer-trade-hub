/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCardsApiUrl } from "../apis/Api"
import { Cards, mappedCards } from "../data/CardData"
import axios from "axios"

export interface QueryParams {
  page: string,
  pageSize: string,
  orderBy: string,
  select: string
}

export const params: QueryParams = {
  page: "1",
  pageSize: "20",
  orderBy: "",
  select: ""
}

export const getCards = async (
  { queryParams, onSuccess, onFailed }:
    {
      queryParams: QueryParams,
      onSuccess: (newCards: Cards) => void,
      onFailed: any
    }) => {
  try {
    const response = await axios.get(
      `${getCardsApiUrl}?page=${queryParams.page}&pageSize=${queryParams.pageSize}`
    );
    const data = await response.data;
    const cards: Cards = mappedCards(data);
    return onSuccess(cards);
  } catch (error) {
    console.error('Error fetching data:', error);
    onFailed(error);
  }
};