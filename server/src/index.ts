import { config } from 'dotenv'
config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { addToPortfolioController } from './controllers/addToPortfolioController'
import { getHoldingsController } from './controllers/getHoldingsController'
import { getAllDataController } from './controllers/getAllData'
import { getTransactionsController} from './controllers/getTransactionsController'

const PORT = 5001
const app = express()

app.use(cors())
app.use(express.json())

app.post('/addToPortfolio', addToPortfolioController)
app.get('/getPortfolio', getHoldingsController)
app.get('/dashBoard', getAllDataController)
app.get('/getTransactions', getTransactionsController)

mongoose.connect(process.env.MONGODB!).then(() => {
	console.log(`Listening on port ${PORT}....`)
	app.listen(PORT)
})
