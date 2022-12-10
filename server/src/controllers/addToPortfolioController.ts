import { Request, Response } from 'express'
import Transactions from '../models/Transactions'
import Holdings from '../models/Holdings'

export async function addToPortfolioController(req: Request, res: Response) {
	// Check first if crypto is in holdings , if it is not add to the holdings else -
	//   add the quantity and paid amount to the exsisting record

	const name = req.body.name || ''
	const symbol = req.body.symbol || ''
	const quantity = Number(req.body.quantity) || 0
	const paid = Number(req.body.paid) || 0
	const date = req.body.date || ''

	if (name === '' || symbol === '' || date === '' || paid <= 0 || quantity <= 0) {
		res.status(400).send('missing or invalid data.')
	} else {
		const checkHoldings = await Holdings.find({ name: name })
		if (!checkHoldings.length) {
			const newHolding = new Holdings({
				symbol: symbol,
				name: name,
				quantity: quantity,
				paid: paid,
				date: date,
			})
			await newHolding.save()
		} else {
			await Holdings.findOneAndUpdate(
				{ name: name },
				{
					date: date,
					$inc: { quantity: quantity, paid: paid },
				}
			)
		}
		// Then add the transaction to transactions collection.
		const newTransaction = new Transactions({
			symbol: symbol,
			name: name,
			quantity: quantity,
			paid: paid,
			date: date,
		})
		await newTransaction.save()
		res.status(200).send('success')
	}
}
