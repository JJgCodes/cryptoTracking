export const BASE_URL = 'http://localhost:5001'
export const COIN_URL =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=nzd&order=market_cap_desc&per_page=250'

export type inputData = {
	symbol: string
	name: string
	quantity: number | string
	paid: number | string
	date: String
}
