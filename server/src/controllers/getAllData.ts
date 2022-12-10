import { Request, Response } from 'express'
import Holdings from '../models/Holdings'
import Transactions from '../models/Transactions'

export async function getAllDataController(req: Request, res: Response) {
	const holdings = await Holdings.find()
	const transactions = await Transactions.find()
	const resp = [{ holdings: holdings, transactions: transactions }]
	res.json(resp)
}
