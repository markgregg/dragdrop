import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import ReactElement from '../types/ReactElement'
import { guid } from '../utils'


// Define a type for the slice state
interface ElementState {
  element: ReactElement
}

// Define the initial state using that type
const initialState: ElementState = {
  element: {
    id: guid(),
    tag: 'div',
    attributes: {},
    style: {
      width: '95vw',
      minHeight: '95vh',
    }
  }
}

export const ElementSlice = createSlice({
  name: 'Element',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setElement: (state, action: PayloadAction<ReactElement>) => {
      state.element = action.payload
    },
  },
})

export const { setElement } = ElementSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const Element = (state: RootState) => state.element

export default ElementSlice.reducer