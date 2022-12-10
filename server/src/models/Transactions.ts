import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TransactionInputs = new Schema({
	symbol: String,
	name: String,
	quantity: Number,
	paid: Number,
	date: String,
})

const TransactionsModel = mongoose.model('transactions', TransactionInputs)

export default TransactionsModel
