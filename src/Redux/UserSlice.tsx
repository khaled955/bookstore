import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState:{
        token:localStorage.getItem("userToken"),
    },
    reducers:{
        setToken:(previousState ,action)=>{
             previousState.token = action.payload
        },
        logOut:(previousState)=>{
            previousState.token = null;
            localStorage.removeItem("userToken")
        },
    }
})
export  const userReducer =  UserSlice.reducer;
export const   userSliceActions = UserSlice.actions