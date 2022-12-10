import { Request, Response } from 'express'
import Transactions from '../models/Transactions'

export async function getTransactionsController(req: Request, res: Response) {
	const transactions = await Transactions.find()
	res.json(transactions)
}
