
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { bookCartInfo, booksinfo, RootState } from "../../Interfaces/Interfaces";
import {
  decreaseCartItem,
  deletBook,
  getCartData,
  increaseCartItem,
} from "../../Redux/CartSlice";
import carlesspeople from "../../assets/images/carlespeople.jpg";
import housemade from "../../assets/images/housemade.jpg";
import theleetthem from "../../assets/images/leetthem.jpg";
import reunion from "../../assets/images/reunion on prague.jpg";
import sunrise from "../../assets/images/sunrise.jpg";
import thelatestmomement from "../../assets/images/thelastmoment.jpg";
 import thenextconversation from "../../assets/images/thenextconversation.jpg";
import thedesertofglass from "../../assets/images/thedesertofglass.jpg";
import { AddressElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Caret() {

const {token:userInfo}= useSelector((store:RootState)=>store.userReducer)

  const dispatch = useDispatch<AppDispatch>();
  const { cartData,isLoading } = useSelector((store: RootState) => store.cartReducer);
  const [taxes, setTaxes] = useState(0);
   const stripe = useStripe()
   const elements = useElements()

const navigate = useNavigate()




  useEffect(() => {
    if(userInfo)dispatch(getCartData())
      
    
  }, []);




  useEffect(() => {
    if (cartData?.total) {
      if (cartData.total > 3000) {
        setTaxes(0);
      } else {
        setTaxes(0.1 * cartData.total);
      }
    }
  }, [cartData]);

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

// submit data to checkout with stripe

async function handleSubmitData(e: FormEvent) {
  e.preventDefault();
  if (!stripe || !elements) return;

  const cardElement = elements.getElement(CardElement);
  const addressElement = elements.getElement(AddressElement);

  if (!cardElement || !addressElement) return;

  const address = await addressElement.getValue();

  const { error, token:viasToken } = await stripe.createToken(cardElement);

  if (error) {
    toast.error(error.message ?? "An unexpected error occurred.");
    return;
  }

  if (!viasToken?.id) {
    toast.error("Failed to generate payment token.");
    return;
  }

  if (!address.complete) {
    toast.error("Please complete your address.");

    return;
  }

  const dataInfo = {
    token:"tok_visa",
    delivery_address: {
      country: address.value.address.country,
      city: address.value.address.city,
      state: "khober",
      building: 25,
      street: "ayhaga",
      floor: 1,
      appartment: 1,
      mobile: address.value.phone,
      additional_info: "ayhaga",
      location: {
        type: "Point",
        coordinates: [30.0444, 31.2357],
      },
    },
  };

  

  const toastId = toast.loading("Payment Under Processing...");
  try {
    const options = {
      url: `https://upskilling-egypt.com:3007/api/order/${cartData?._id}`,
      method: "POST",
      data: dataInfo,
      headers: {
        Authorization: `Bearer ${userInfo}`,
        "Content-Type": "application/json",
      },
    };





    const { data } = await axios.request(options);
    if(data.status === "SUCCESS"){

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Your order has been placed successfully.',
        confirmButtonText: 'Go to Orders',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/orders'); // Go to orders after confirmation
        }

      })






      setTimeout((
      )=>{

        navigate("/orders")

      },2000)
    }

    dispatch(getCartData());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message ?? "Something went wrong.");
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    toast.dismiss(toastId);
  }
}


  return (
    <>
      <h1 className="text-3xl font-bold text-gray-600 mb-5">🛒 Your Order</h1>
 
      {isLoading? (
        <div className="fixed top-0 left-0 w-screen z-[99999999] flex justify-center items-center bg-gray-600/20 h-screen">
          <p>
            <i className="fa-solid fa-circle-notch fa-spinner animate-spin"></i>
          </p>
        </div>
      ) : (
        <>
          { !cartData? (
            <p style={{ color: "red" }}>
              Your cart is empty. You have no items in your shopping cart, let's add some items you
              like.
            </p>
          ) : (
            <section className=" space-y-4 flex gap-3 flex-col sm:flex-row items-center sm:items-start min-h-screen">
              <div className="sm:w-[60%] space-y-5">
                {Array.isArray(cartData?.items) &&
                  cartData?.items?.filter((item:bookCartInfo)=>item.quantity > 0).map((item: bookCartInfo, index) => {
                    const book = bookDetails[index] ?? {
                      nameofbook: "Unknown Book",
                      photo: "",
                      details: "",
                    };
                    return (
                      <div
                        key={item._id || item.book}
                        className="shadow-md flex gap-3 overflow-hidden py-2 relative px-4 flex-wrap sm:flex-nowrap justify-center items-center"
                      >
                        <div className="img">
                          <img className="w-28" src={book.photo} alt={book.nameofbook} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                          <h2 className="font-bold mb-3">{book.nameofbook}</h2>
                          <div className="flex w-full gap-4 items-center justify-center">
                            <div className="flex items-center justify-center gap-4">
                              <button className="size-6 flex justify-center items-center border-2 rounded-full font-black cursor-pointer">
                                {item.quantity === 1 ? (
                                  <i
                                    onClick={() => {
                                      dispatch(deletBook({ bookId: item.book }));
                                      setTaxes(0)
                                    }}
                                    className="fa-solid fa-trash-can text-red-700 cursor-pointer"
                                  ></i>
                                ) : (
                                  <i
                                    onClick={() => {
                                      dispatch(
                                        decreaseCartItem({
                                          bookId: item.book,
                                          basketId: cartData._id,
                                        })
                                      );
                                    }}
                                    className="fa-solid fa-minus"
                                  ></i>
                                )}
                              </button>
                              <span>{item.quantity}</span>
                              <button className="size-6 flex justify-center items-center border-2 rounded-full font-black cursor-pointer">
                                <i
                                  onClick={() => {
                                    dispatch(
                                      increaseCartItem({
                                        bookId: item.book,
                                        basketId: cartData._id,
                            
                                      })
                                    );
                                  }}
                                  className="fa-solid fa-plus"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                     
                      </div>
                    );
                  })}
              </div>

             {cartData &&  cartData.items.some((item:bookCartInfo)=>item.quantity > 0) ? <>
             
              <div className="tax-details w-full sm:flex-1 flex flex-col">
                <div className="p-4 space-y-3 rounded-2xl shadow bg-white">
                  <h2 className="text-xl font-semibold">🧾 Order Summary</h2>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{cartData?.total} EG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{taxes} EG</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{ cartData? cartData?.total + taxes :0} EG</span>
                  </div>
                </div>

              <div className="payment-box px-3">
              <h2 className="my-5 text-gray-600 text-lg"> Payment Info</h2>
                <form className="mt-6" onSubmit={handleSubmitData}>
             <CardElement/>
             <h2 className="my-8 text-gray-600 text-lg"> Address Details</h2>
                   

             <AddressElement
        options={{
          mode: "billing",
          
          fields: {
            phone: "always",
          
          },
        }}
      />

       <button disabled={!stripe} className="bg-green-600 w-full mt-4 hover:text-white transition-colors duration-300 cursor-pointer" type="submit">Check Out</button>
              </form>

              </div>









              </div>
           

             </> :<p className="w-full" style={{ color: "red" }}>
              Your cart is empty You have no items in your shopping cart, let's add some items you
              like.
            </p>
    













}


            </section>
          )}
        </>
      )}
    </>
  );
 }





