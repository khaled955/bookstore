
import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './UserSlice'
import { authReducer } from './AuthSlice'
import { cartReducer } from './CartSlice'
import { whishListReducer } from './whishlistSlice'

export const myStore = configureStore({
    reducer:{

userReducer,
authReducer,
cartReducer,
whishListReducer,
    }
})



// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;