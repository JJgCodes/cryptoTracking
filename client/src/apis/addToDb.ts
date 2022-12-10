import { BASE_DB_URL as DB, inputData } from '../config/config'

export async function addCryptoToDb(data: inputData) {
	fetch(`${DB}/addToPortfolio`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
