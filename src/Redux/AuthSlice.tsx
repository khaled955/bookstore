import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"AuthForm",
    initialState:{
        showLogin:false,
        showRegister:false,
        showForgotPassword:false,
        showResetPassword:false,
    },
    reducers:{
        // login form
        showLoginForm:(previousState)=>{
            previousState.showLogin = true
       },

     hideLoginForm:(previousState)=>{
         previousState.showLogin = false
     },
     // register form
     showRegisterForm:(previousState)=>{
        previousState.showRegister = true
     },
     hideRegisterForm:(previousState)=>{
        previousState.showRegister = false
     },
     // forgot password form
     showForgotPasswordForm:(previousState)=>{
        previousState.showForgotPassword = true
     },
     hideForgotPasswordForm:(previousState)=>{
        previousState.showForgotPassword = false
     },
     // reset password form
     showResetPasswordForm:(previousState)=>{
        previousState.showResetPassword = true
     },
     hideResetPasswordForm:(previousState)=>{
        previousState.showResetPassword = false
     },



    }
       

})
export const authReducer = authSlice.reducer
export  const authSliceActions = authSlice.actions