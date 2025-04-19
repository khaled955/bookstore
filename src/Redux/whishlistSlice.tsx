import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../Interfaces/Interfaces";
import toast from "react-hot-toast";

const whishlistSlice = createSlice({
    name: "whishlist",
    initialState:{
    whislistBooks:JSON.parse(localStorage.getItem("whishListItemsStorage") || "[]") as Book[] ,
     isWished:false


    },
    reducers:{
        addBookToWhishlist:(previousState,action:PayloadAction<Book>)=>{
         if(previousState.whislistBooks.some((book:Book)=> book._id === action.payload._id)){

            previousState.whislistBooks = previousState.whislistBooks.filter((book:Book)=> book._id !== action.payload._id);
          
            localStorage.setItem("whishListItemsStorage",JSON.stringify(previousState.whislistBooks))




             toast("Book Is Removed Successfully",{
                style: {
                    background: 'green',
                    color: '#fff',
                  },
             })
             return;

         }else{
            previousState.whislistBooks.push(action.payload)
            localStorage.setItem("whishListItemsStorage",JSON.stringify(previousState.whislistBooks))
             toast.success("Book Added Successfully")
         }
          
        },
        resetBookListWishes:(previousState)=>{

           previousState.whislistBooks = []
        }
      
            
    
},





})


export const whishListReducer = whishlistSlice.reducer

export const { addBookToWhishlist,resetBookListWishes } = whishlistSlice.actions;