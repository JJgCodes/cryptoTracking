import { configureStore } from '@reduxjs/toolkit'
import allDataReducer from './slices/allDataSlice'
import modalReducer  from './slices/modalSlice'

export const store = configureStore({
	reducer: {
		allData: allDataReducer,
		modal: modalReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
