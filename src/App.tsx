import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import GuestRout from "./Components/GuestRoute/GuestRout"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import Category from "./Components/Category/Category"
import Orders from "./Components/Orders/Orders"
import Caret from "./Components/Caret/Caret"
import Profile from "./Components/Profile/Profile"
import Wishlist from "./Components/Wishlist/Wishlist"
import BookDetails from "./Components/BookDetails/BookDetails"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AllCategoryShow from "./Components/AllCategoryShow/AllCategoryShow"
import { Provider } from 'react-redux'
import { myStore } from "./Redux/Store"
import TrendingDetailsBooks from "./Components/TrendingDetailsBooks/TrendingDetailsBooks"
import Allbooks from "./Components/AllBooks/Allbooks"
import NotFound from "./Components/NotFound/NotFound"
import CounterProvider from "./Context/CountContext"
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import useOnline from "./Hooks/useOnline"



function App() {
  const stripePromise = loadStripe('pk_test_51RCcQcHDtB7eo430OPOqCJ1YzbkgqNMdKMRvwbcEH615mHJhqXwnqmVqkE08Gq9LBFhTdapQz4GL4DuvTYvtHP7Y00QrSCaP6p');
  const isOnline = useOnline()


  
const routes = createBrowserRouter([

{path:"/", element: <GuestRout><Layout/> </GuestRout> , children:[
  {index:true , element:<Home/>},
  {path:"home" , element:<Home/>},

]},

{path:"/" ,element:<ProtectedRoute>
  <Layout/>
</ProtectedRoute> ,children:[
  
  {path:"category" , element:<Category/>},
  {path:"cart" , element:<Caret/>},
  {path:"orders" , element:<Orders/>},
  {path:"profile" , element:<Profile/>},
  {path:"wishlist" , element:<Wishlist/>},
  {path:"details/:id/:index" , element:<BookDetails/>},
  {path:"allcategorydisplay" , element:<AllCategoryShow/>},
  {path:"allbooks" , element:<Allbooks/>},
  {path:"trendingdetailsbooks/:trendId" , element:<TrendingDetailsBooks/>},
  {path:"*" , element:<NotFound/>},




]},





])





  const myClient = new QueryClient();





  return (
    <>
{! isOnline &&<h2 className="fixed top-0 left-[50%] -translate-x-[50%] bg-black text-white z-[9999999999999] px-3 py-1"> <i className="fa-solid fa-wifi mr-3"></i>Check NetWork Connection</h2>
}


<Elements stripe={stripePromise}>
   <Provider store={myStore}>

    <QueryClientProvider client={myClient}>
      <CounterProvider>
<RouterProvider router={routes}></RouterProvider> 
</CounterProvider>
</QueryClientProvider>

</Provider>
</Elements>


    <Toaster
  toastOptions={{
    success: {
      style: {
        background: 'green',
        color: '#fff',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
    loading:{
      style:{
        backgroundColor:"red",
        color:"white"
      }
    }
  }}
/>





    </>
  )
}

export default App
