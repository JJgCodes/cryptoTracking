import { BASE_DB_URL } from '../config/config'

export const getAllData = async () => {
	const response = await fetch(`${BASE_DB_URL}/dashBoard`)
	return await response.json()
}