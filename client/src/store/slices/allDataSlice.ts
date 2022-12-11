import { createSlice } from '@reduxjs/toolkit'
import { Data, Holding } from '../../config/config'

interface DataState {
	data: Data[]
}

const initialState: DataState = {
	data: []
}

const dataSlice = createSlice({
	name: 'allData',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload
		},

		// ---> Considering updating the add form in real time/as the user submits rather than reloading from an api request to the server....
		// pushData: (state, action) => {
		// 	state.data[0].transactions.push(action.payload)

		// 	const holdingIndex = state.data[0].holdings.findIndex(
		// 		(holding: Holding) =>
		// 			holding.symbol === action.payload.symbol && holding.name === action.payload.name
		// 	)

		// 	if (holdingIndex >= 0) {
		// 		// Update the existing holding with the new transaction data
		// 		state.data[0].holdings[holdingIndex] = {
		// 			...state.data[0].holdings[holdingIndex],
		// 			quantity: Number(state.data[0].holdings[holdingIndex].quantity) + Number(action.payload.quantity),
		// 			paid: Number(state.data[0].holdings[holdingIndex].paid) + Number(action.payload.paid),
		// 		}
		// 	} else {
		// 		// Add a new holding with the transaction data
		// 		state.data[0].holdings.push({
		// 			symbol: action.payload.symbol,
		// 			name: action.payload.name,
		// 			quantity: action.payload.quantity,
		// 			paid: action.payload.paid,
		// 			date: action.payload.date,
		// 		})
		// 	}
		// },
	},
})

export const { setData } = dataSlice.actions
export default dataSlice.reducer
