import carlesspeople from "../../assets/images/carlespeople.jpg";
import housemade from "../../assets/images/housemade.jpg";
import theleetthem from "../../assets/images/leetthem.jpg";
import reunion from "../../assets/images/reunion on prague.jpg";
import sunrise from "../../assets/images/sunrise.jpg";
import thelatestmomement from "../../assets/images/thelastmoment.jpg";
 import thenextconversation from "../../assets/images/thenextconversation.jpg";
import thedesertofglass from "../../assets/images/thedesertofglass.jpg";
import {  useNavigate } from "react-router-dom";
import { Book, booksinfo, RootState } from "../../Interfaces/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../Redux/AuthSlice";
import { useState } from "react";
import { addItemToCart } from "../../Redux/CartSlice";
import { AppDispatch } from "../../Redux/Store";
import { addBookToWhishlist } from "../../Redux/whishlistSlice";

export default function Whishlist() {
const [counter , setCounter] = useState(1)
const {token} = useSelector((store:RootState)=>store.userReducer)

const {whislistBooks} = useSelector((store:RootState)=>store.whishListReducer)


const {showLoginForm} = authSliceActions
const dispatch = useDispatch<AppDispatch>()
const navigate = useNavigate()


function handleCounterIncrease(){
  setCounter(counter + 1)
}
function handleCounterDecrease(){
  setCounter(counter - 1)
}


const bookDetails: booksinfo[] = [
  { nameofbook: "Careless People", details: "...", photo: carlesspeople },
  { nameofbook: "The HOUSE MAID", details: "...", photo: housemade },
  { nameofbook: "The LEET THEM", details: "...", photo: theleetthem },
  { nameofbook: "REUNION PRAGUE", details: "...", photo: reunion },
  { nameofbook: "SUNRISE ON THE REAPING", details: "...", photo: sunrise },
  { nameofbook: "THE LAST MONUMENT", details: "...", photo: thelatestmomement },
  { nameofbook: "THE NEXT CONVERSATION", details: "...", photo: thenextconversation },
  { nameofbook: "THE DESERT OF GLASS", details: "...", photo: thedesertofglass },
];


  return (
    <>
     <h2 className="text-gray-700 font-bold text-3xl mb-5"> Your Whishlist Books </h2>

    {whislistBooks.length === 0 ? <p className="text-center font-semibold text-red-700">Your Wishlist Is Empty</p>:<>
    <div className="grid sm:grid-cols-2 md:grid-cols-3">
    {whislistBooks.map((book:Book,index:number)=> <div key={book._id}>
    
    <div className="card-box shadow-md p-4 flex flex-col">
    <button 
     className="img-box p-7 cursor-pointer">
      <img className="w-full h-60 object-contain" src={bookDetails[index].photo} alt={book.description} />
    </button>
    <div className="text-box">
      <h2 className="text-lg font-bold text-center mb-2">{bookDetails[index].nameofbook}</h2>
      <div className="product-info">
          <p className="text-sm text-gray-600 text-center line-clamp-3">{bookDetails[index].details}</p>
          <div className="flex justify-between items-center my-2">
              <span className="text-sm text-black capitalize"> {book.price} <span>EG</span></span>
              <div>
              <i className="fa-solid fa-star text-yellow-600"></i>
              <i className="fa-solid fa-star text-yellow-600"></i>
              <i className="fa-solid fa-star text-yellow-600"></i>
               <span>4.8</span>
              </div>
              
          </div>


          <div className="btn-count flex justify-center items-center gap-6 my-3">
            <button onClick={handleCounterDecrease} className={`cursor-pointer`} disabled={counter === 1}>
            <i className="fa-solid fa-minus"></i>
            </button>
          <span className=" bg-red-600 size-6 grid place-content-center rounded-2xl text-white">{counter}</span>
          <button onClick={handleCounterIncrease} className={`cursor-pointer`} disabled={counter === 10}>
            <i className="fa-solid fa-plus"></i>
            </button>
          </div>



          
          <div className="flex justify-between border-t-1 py-2 border-gray-400">
              <p className={`size-6 flex justify-center items-center border-1 rounded-full border-gray-300 hover:shadow-lg transition-shadow duration-300 p-4             ${whislistBooks.some((book:Book)=>book._id === book._id)?"bg-red-700":""}
`}>
              <i
                onClick={()=>{
                  if(token){
                    dispatch(addBookToWhishlist(book))
                  }else{
                    dispatch(showLoginForm())
              
                  }
                }}
              
              
              
              title="Add To Wishlist" className={`fa-regular fa-heart cursor-pointer `}></i>
              </p>
              <p className="size-6 flex justify-center items-center border-1 rounded-full border-gray-300 hover:shadow-lg transition-shadow duration-300 p-4">
             <button 
             onClick={()=>{
              if(token){
            navigate(`/details/${book._id}/${index}`)
              }else{
                dispatch(showLoginForm())
          
              }
            }}
             
             
             > <i title="Show Details" className="fa-solid fa-eye cursor-pointer"></i></button> 
              </p>
              <p className="size-6 flex justify-center items-center border-1 rounded-full border-gray-300 hover:shadow-md transition-shadow duration-300 p-4">
              <i onClick={()=>{



if(token){
  dispatch(addItemToCart({bookId:book._id,bookQuantity:counter}))

}else{
  dispatch(showLoginForm())

}


              }} title="Add To Cart" className="fa-solid fa-cart-plus cursor-pointer"></i> 
              </p>
          </div>
      </div>
    </div>
  </div>
  
  
  
  
  
  
  
  
  

  {/*  last of map here  */}
  </div>)}
    </div>
   
    
    
    
    
    
    
    




    
    </>}
    </>
  )
}
