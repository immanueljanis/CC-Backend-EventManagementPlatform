// 

import { createSlice } from "@reduxjs/toolkit";

// const [user, setUser] = useState(null)
const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (initialState, action) => {
            initialState.user = action.payload // null ---> [{}]
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer    