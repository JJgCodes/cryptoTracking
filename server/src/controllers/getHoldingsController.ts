import { Request, Response } from 'express'
import Holdings from '../models/Holdings'


export async function getHoldingsController(req: Request, res: Response) {
	const holdings = await Holdings.find()
	res.json(holdings)
}
