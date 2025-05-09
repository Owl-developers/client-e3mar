import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
    username?: string
    phone?: string
    imageProfile?: string
    isSuperAdmin?: false
}
const initialState: IInitialState = {}

const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<{}>) {
            if(Object.keys(action.payload).length == 0) {
                return {}
            }
            Object.assign(state, action.payload)
            return state
        }
    }
})

export const {setUserData} = userData.actions
export default userData.reducer