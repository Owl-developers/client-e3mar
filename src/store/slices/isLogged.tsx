import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = false

const isLogged = createSlice({
  name: 'isLogged',
  initialState,
  reducers: {
    setIsLogged(state, action: PayloadAction<boolean>) {
      return state = action.payload
    },
  },
})

export const {setIsLogged} = isLogged.actions
export default isLogged.reducer