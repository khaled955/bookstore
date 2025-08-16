/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux"
import { booksinfo, CustomerOrder, OrderItem, RootState } from "../../Interfaces/Interfaces"
import axios from "axios"
import { useEffect, useState } from "react"
import carlesspeople from "../../assets/images/carlespeople.jpg";
import housemade from "../../assets/images/housemade.jpg";
import theleetthem from "../../assets/images/leetthem.jpg";
import reunion from "../../assets/images/reunion on prague.jpg";
import sunrise from "../../assets/images/sunrise.jpg";
import thelatestmomement from "../../assets/images/thelastmoment.jpg";
 import thenextconversation from "../../assets/images/thenextconversation.jpg";
import thedesertofglass from "../../assets/images/thedesertofglass.jpg";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";





export default function Orders() {
  const {token:userInfo}= useSelector((store:RootState)=>store.userReducer)
 const [orders, setOrders] = useState([])

 async function getUserOrders(){
try {
  const options ={
    url:`https://upskilling-egypt.com:3007/api/order/my`,
    method:"GET",
    headers: {
      Authorization: `Bearer ${userInfo}`,
      "Content-Type": "application/json",
    },
  }


const {data} = await axios.request(options)
setOrders(data)

} catch (error) {
if (axios.isAxiosError(error)) {
  toast.error("Error fetching orders")
}


}


}


useEffect(()=>{
if(userInfo)getUserOrders()

},[])

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
    <div className="p-4">


      <h2 className="text-gray-700 font-bold text-2xl mb-5">Your Confirmed Orders</h2>
      {orders.length === 0 ? <p className="text-center text-red-600 font-semibold capitalize">You Dont Have Confirmed Orders</p>:<>
     {!orders ? <Loading/> :  <section className=" p-2 rounded-md space-y-3">
       {orders.map((order:CustomerOrder)=> <div key={order._id} className="border-[1px] p-2">
       <h2 className="mb-3 font-bold text-xl"> Payment Order Ref: <span className="ml-3 text-gray-500">{order.payment_ref}</span></h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {order.items.map((item:OrderItem,index:number)=> <div key={item._id} className="shadow-md border-2 border-black/15">
            <img className="w-full h-52 object-contain" src={bookDetails[index].photo}/>
            <p className="text-center"> Quantity:{item.quantity}</p>

          </div>
        )}
        </div>
        <p className="mt-4 font-semibold"> Total Payment:{order.total}</p>
       </div>)}
      </section>}



      </> }
    </div>
  )
}
