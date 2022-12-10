import { BASE_DB_URL as DB } from '../config/config'

export const getAllData = async () => {
	const response = await fetch(`${DB}/dashBoard`)
	return await response.json()
}