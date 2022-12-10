import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PortfolioItems = new Schema({
	symbol: String,
	name: String,
	quantity: Number,
	paid: Number,
	date: String,
})

const HoldingsModel = mongoose.model('holdings', PortfolioItems)

export default HoldingsModel
