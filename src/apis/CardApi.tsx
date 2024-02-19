/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCardsApiUrl } from "../apis/Api"
import { Cards, mappedCards } from "../data/CardData"
import axios from "axios"

export interface QueryParams {
  q: string,
  page: string,
  pageSize: string,
}

export const defalutParams: QueryParams = {
  q: "",
  page: "1",
  pageSize: "20",
}

export const getCards = async (
  { queryParams, onSuccess, onFailed }:
    {
      queryParams: QueryParams,
      onSuccess: (newCards: Cards) => void,
      onFailed: any
    }) => {
  try {
    const qParam = queryParams.q === "" ? "" : `?q=name:${queryParams.q}`;
    const response = await axios.get(
      `${getCardsApiUrl}${qParam}${qParam ? "&" : "?"}page=${queryParams.page}&pageSize=${queryParams.pageSize}`
    );
    const data = await response.data;
    const cards: Cards = mappedCards(data);
    return onSuccess(cards);
  } catch (error) {
    console.error('Error fetching data:', error);
    onFailed(error);
  }
};