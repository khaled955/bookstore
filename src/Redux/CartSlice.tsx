/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { AddToCartPayload, CartItem, CartIteminfo, CartState} from "../Interfaces/Interfaces";

// token from local storage





// add to cart function
 export const addItemToCart = createAsyncThunk<  any, AddToCartPayload >("addtocart", async function({bookId,bookQuantity}:AddToCartPayload,{dispatch}){
 const toastId = toast.loading("Add Item Under Processing.....")
 const tokenString = localStorage.getItem("userToken") ?? undefined;

try {
    
    const options = {
        url:`https://upskilling-egypt.com:3007/api/basket/item`,
        method:"POST",
        data:{
           book:bookId,
           quantity:bookQuantity, 
        },
        headers: {
            Authorization: `Bearer ${tokenString}`,
            "Content-Type": "application/json",
          },
    }

const {data} = await axios.request(options)
toast.success(data.message)

const addProductList = await dispatch(getCartData())
  return addProductList.payload



} catch (error) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message ?? "Something went wrong.");

  } else {
    toast.error("An unexpected error occurred.");
  }
  
}finally{
    toast.dismiss(toastId)
}

})


// get cart data
export const getCartData = createAsyncThunk("getCartData", async function (){
  const tokenString = localStorage.getItem("userToken") ?? undefined;


 if(!tokenString) return


try {
    const options = {
        url:`https://upskilling-egypt.com:3007/api/basket`,
        method:"GET",
        headers: {
            Authorization: `Bearer ${tokenString}`,
            "Content-Type": "application/json",
          },
    }

const {data} = await axios.request(options)

return data

} catch (error) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message ?? "Something went wrong.");

}}






})

// increase no of item in cart 



export const increaseCartItem = createAsyncThunk<any, AddToCartPayload>(
    "increasecartitem",
    async function ({ bookId, basketId }: AddToCartPayload, { dispatch }) {
      const tokenString = localStorage.getItem("userToken") ?? undefined;

      const toastId = toast.loading("Updating Under Processing.....");
      try {
        // Get current cart
        const cartBeforeUpdate = await dispatch(getCartData());
        const currentItems = cartBeforeUpdate.payload.items;
             
        // Prepare full items list with updated quantity
        const updatedItems = currentItems.map((item:CartItem) =>
          item.book === bookId
          
            ? { book: bookId, quantity: item.quantity + 1 }
            : { book: item.book, quantity: item.quantity }
        );

        // Send full updated list to backend
        const options = {
          url: `https://upskilling-egypt.com:3007/api/basket/${basketId}`,
          method: "PUT",
          data: {
            items: updatedItems,
          },
          headers: {
            Authorization: `Bearer ${tokenString}`,
            "Content-Type": "application/json",
          },
        };
  
        const { data } = await axios.request(options);
  
        toast.dismiss(toastId);
        toast.success(data.message);
  
       

        return {...data.data,items:[...updatedItems]}
      } catch (error) {

        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? "Something went wrong.");
      
        }




      } finally {
        toast.dismiss(toastId);
      }
    }
  );
  









// Decrease no of item in cart 



export const decreaseCartItem = createAsyncThunk<any, AddToCartPayload>(
    "decreaseCartItem",
    async function ({ bookId, basketId }: AddToCartPayload, { dispatch }) {
      const tokenString = localStorage.getItem("userToken") ?? undefined;

      const toastId = toast.loading("Updating Under Processing.....");
      try {
        // Get current cart
        const cartBeforeUpdate = await dispatch(getCartData());
        const currentItems = cartBeforeUpdate.payload.items;
             
        // Prepare full items list with updated quantity
        const updatedItems = currentItems.map((item:CartItem) =>
          item.book === bookId
          
            ? { book: bookId, quantity: item.quantity - 1 }
            : { book: item.book, quantity: item.quantity }
        );

        // Send full updated list to backend
        const options = {
          url: `https://upskilling-egypt.com:3007/api/basket/${basketId}`,
          method: "PUT",
          data: {
            items: updatedItems,
          },
          headers: {
            Authorization: `Bearer ${tokenString}`,
            "Content-Type": "application/json",
          },
        };
  
        const { data } = await axios.request(options);
  
        toast.dismiss(toastId);
        toast.success(data.message);
  
       

        return {...data.data,items:[...updatedItems]}
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? "Something went wrong.");
        }      


      } finally {
        toast.dismiss(toastId);
      }
    }
  );












// delet specific book 

export const deletBook = createAsyncThunk<any, AddToCartPayload>(
    "deletbook",
    async function ({ bookId }, { dispatch }) {
      const tokenString = localStorage.getItem("userToken") ?? undefined;

      const toastId = toast.loading("Deleting Book Under Processing....");
  
      try {
        const options = {
          url: `https://upskilling-egypt.com:3007/api/basket/item`,
          method: "DELETE",
          data: {
            book: bookId,
          },
          headers: {
            Authorization: `Bearer ${tokenString}`,
            "Content-Type": "application/json",
          },
        };
  
        const { data } = await axios.request(options);
        toast.success("Book Deleted Successfully ");
         
            console.log(data)


        // After deletion, fetch fresh cart data
        const refreshedCart = await dispatch(getCartData());
         const recentBooks = refreshedCart.payload.items.filter((item:CartIteminfo)=> item.book !== bookId)
        return {...refreshedCart.payload,items:recentBooks?recentBooks:[]};





      } finally {
        toast.dismiss(toastId);
      }
    }
  );
  










const initialState: CartState = {
    cartData: null,
    error: null,
    isLoading: false,
    isError: false,
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
    

    },
    extraReducers:function(builder){



         // cases for add item to cart

        builder.addCase(addItemToCart.pending, (previousState) => {
            previousState.cartData = null;
            previousState.isLoading = true;
            previousState.error = null;
            previousState.isError = false;
        });
    
        builder.addCase(addItemToCart.fulfilled, (previousState, action) => {
            previousState.cartData = action.payload;
            previousState.isLoading = false;
            previousState.error = null;
            previousState.isError = false;
        });
    
        builder.addCase(addItemToCart.rejected, (previousState, action) => {
            previousState.isLoading = false;
            previousState.error = action.error.message; 
            previousState.isError = true;
        });



 // cases for get cart data

 builder.addCase(getCartData.pending, (previousState) => {
    // previousState.cartData = null;
    previousState.isLoading = true;
    // previousState.error = null;
    // previousState.isError = false;
});



builder.addCase(getCartData.fulfilled, (previousState, action) => {
    previousState.cartData = action.payload;
    previousState.isLoading = false;
    previousState.error = null;
    previousState.isError = false;
});



        builder.addCase(getCartData.rejected, (previousState, action) => {
            previousState.isLoading = false;
            previousState.error = action.error.message; 
            previousState.isError = true;
        });



// cases for increase cart item


builder.addCase(increaseCartItem.pending, (previousState) => {
    previousState.isLoading = true;
    previousState.error = null;
    previousState.isError = false;
});



builder.addCase(increaseCartItem.fulfilled, (previousState, action) => {
    previousState.cartData = action.payload;
    previousState.isLoading = false;
    previousState.error = null;
    previousState.isError = false;








});





        builder.addCase(increaseCartItem.rejected, (previousState, action) => {
            previousState.isLoading = false;
            previousState.error = action.error.message; 
            previousState.isError = true;
        });



// cases for decrease quantity item function 



builder.addCase(decreaseCartItem.pending, (previousState) => {
    previousState.isLoading = true;
    previousState.error = null;
    previousState.isError = false;
});



builder.addCase(decreaseCartItem.fulfilled, (previousState, action) => {
    previousState.cartData = action.payload;
    previousState.isLoading = false;
    previousState.error = null;
    previousState.isError = false;
});





        builder.addCase(decreaseCartItem.rejected, (previousState, action) => {
            previousState.isLoading = false;
            previousState.error = action.error.message; 
            previousState.isError = true;
        });





// cases for deletbook

builder.addCase(deletBook.pending, (previousState) => {
    previousState.isLoading = true;
    previousState.error = null;
    previousState.isError = false;
});



builder.addCase(deletBook.fulfilled, (previousState, action) => {
    previousState.cartData = action.payload;
    previousState.isLoading = false;
    previousState.error = null;
    previousState.isError = false;
});

// builder.addCase(deletBook.fulfilled, (previousState, action) => {
//   if (action.payload) {
//     // Filter out items with quantity <= 0
//     const validItems = action.payload.items.filter(
//       (item: CartIteminfo) => item.quantity > 0
//     );
    
//     previousState.cartData = {
//       ...action.payload,
//       items: validItems, // Keep only valid items
//       total: action.payload.total // Update total if needed
//     };
//   }
//   previousState.isLoading = false;
//   previousState.error = null;
//   previousState.isError = false;
// });





        builder.addCase(deletBook.rejected, (previousState, action) => {
            previousState.isLoading = false;
            previousState.error = action.error.message; 
            previousState.isError = true;
        });









    }
})


export const  cartReducer = cartSlice.reducer

