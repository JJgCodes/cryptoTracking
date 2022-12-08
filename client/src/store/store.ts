import { configureStore } from '@reduxjs/toolkit'
import allDataReducer from './slices/allDataSlice'

export const store = configureStore({
	reducer: {
		allData: allDataReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
