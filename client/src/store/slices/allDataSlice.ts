import { createSlice} from '@reduxjs/toolkit'
import { Data } from '../../config/config'

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
	},
})


export const { setData } = dataSlice.actions
export default dataSlice.reducer
