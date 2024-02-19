const baseApiUrl: string = "https://api.pokemontcg.io/v2"
export const getCardsApiUrl: string = `${baseApiUrl}/cards`
export const getSetsApiUrl: (id: string) => string = (id: string) => `${baseApiUrl}/sets/${id}`
export const getTypesApiUrl: string = `${baseApiUrl}/types`
export const getRaritiesApiUrl: string = `${baseApiUrl}/rarities`

export interface ErrorResponse {
  message: string,
  code: number,
}
