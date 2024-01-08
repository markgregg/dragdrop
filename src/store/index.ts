import { configureStore } from '@reduxjs/toolkit'
import elementSlice from './elementSlice'

export const store = configureStore({
  reducer: {
    element: elementSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch