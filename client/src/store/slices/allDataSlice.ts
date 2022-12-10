import { createSlice} from '@reduxjs/toolkit'

interface DataState {
	data: any
}
const initialState: DataState = {
	data: [],
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
