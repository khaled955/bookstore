// /* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { BookDetailsInfo, booksinfo, RootState } from "../../Interfaces/Interfaces"
// import Loading from "../Loading/Loading"
// import carlesspeople from "../../assets/images/carlespeople.jpg"
// import housemade from "../../assets/images/housemade.jpg"
// import theleetthem from "../../assets/images/leetthem.jpg"
// import reunion from "../../assets/images/reunion on prague.jpg"
// import sunrise from "../../assets/images/sunrise.jpg"
// import thelatestmomement from "../../assets/images/thelastmoment.jpg"
// import thenextconversation from "../../assets/images/thenextconversation.jpg"
// import thedesertofglass from "../../assets/images/thedesertofglass.jpg"
// import { AppDispatch } from "../../Redux/Store"
// import { addItemToCart } from "../../Redux/CartSlice"













// export default function BookDetails() {
//   const [counter , setCounter] = useState(1)

//   const {id,index} = useParams()
//   const [bookdetails , setbookdetails] = useState<BookDetailsInfo | null >(null)

//   const dispatch = useDispatch<AppDispatch>()


// const {token} = useSelector((store:RootState)=>store.userReducer)







// async function getCertainBookById(){
//   try{
//     const options = {
//       url:`https://upskilling-egypt.com:3007/api/book/${id}`,
//       method:"GET",
//       headers: {
//         Authorization: `Bearer ${token}`, // Attach token
//         "Content-Type": "application/json",
//       },
//     }
//     const {data} = await axios.request(options)
// setbookdetails(data)
//   }catch(error){
// console.log(error)
//   }
// }


// useEffect(()=>{
//   getCertainBookById()

// },[])


// const bookDetailsStatic:booksinfo[] = [{nameofbook:"Careless People" ,details:`Careless People is darkly funny and genuinely shocking...Not only does [Sarah Wynn-Williams] have the storytelling chops to unspool a gripping narrative; she also delivers the goods." -Jennifer Szalai, The New York Times
//   “When one of the world’s most powerful media companies tries to snuff out a book ― amid other alarming attacks on free speech in America like this ― it’s time to pull out all the stops.” –Ron Charles, The Washington Post
//    An explosive memoir charting one woman’s career at the heart of one of the most influential companies on the planet, Careless People gives you a front-row seat to Facebook, the decisions that have shaped world events in recent decades, and the people who made them.` , photo :carlesspeople},
  
//    {nameofbook:"The HOUSE MAID" ,details:`Every day I clean the Winchesters’ beautiful house top to bottom. I collect their daughter from school. And I cook a delicious meal for the whole family before heading up to eat alone in my tiny room on the top floor.
//   I try to ignore how Nina makes a mess just to watch me clean it up. How she tells strange lies about her own daughter. And how her husband Andrew seems more broken every day. But as I look into Andrew’s` , photo :housemade},
  
//   {nameofbook:"The LEET THEM" ,details:`What if the key to happiness, success, and love was as simple as two words?
//   If you've ever felt stuck, overwhelmed, or frustrated with where you are, the problem isn't you. The problem is the power you give to other people. Two simple words—Let Them—will set you free. Free from the opinions, drama, and judgments of others. Free from the exhausting cycle of trying to manage everything and everyone around you. The Let Them Theory puts the power to create a life you love back in your hands—and this book will show you exactly how to do it.
//   In her latest groundbreaking book, The Let Them Theory, Mel Robbins—New York Times bestselling author and one of the world's most respected experts on motivation, confidence, and mindset—teaches you how to stop wasting energy on what you can't control and start focusing on what truly matters: YOU. Your happiness. Your goals. Your life.
//   ` , photo :theleetthem},
  
//   {nameofbook:"REUNION PRAGUE" ,details:`Everyman spy Alex Kovacs returns to action in Reunion in Prague, the 13th book in a series that has earned more than 15,000 5-star reviews. This time, he visits his home country, the place where he was born, the place that he turned his back on at age 16 for a new life with his uncle in Vienna.
//   Prague, several years after the war, has been consumed by its Communist oppressors. Private enterprise is being eliminated. The secret police have begun to follow in the footsteps of their masters, the KGB. Show trials of “enemies of the state” have become a macabre form of popular entertainment. And Alex’s employers at the Gehlen Organization are anxious for inside information from behind this particularly
  
//   ` , photo :reunion},
  
//   {nameofbook:"SUNRISE ON THE REAPING" ,details:`The phenomenal fifth book in the Hunger Games series!
//    When you’ve been set up to lose everything you love, what is there left to fight for?
//    As the day dawns on the fiftieth annual Hunger Games, fear grips the districts of Panem. This year, in honor of the Quarter Quell, twice as many tributes will be taken from their homes.
//    Back in District 12, Haymitch Abernathy is trying not to think too hard about his chances. All he cares about is making it through the day and being with the girl he loves.
//    When Haymitch’s name is called, he can feel all his dreams break. He’s torn from his family and his love, shuttled to the Capitol with the three other District 12 tributes: a young friend who’s nearly a sister to him, a compulsive oddsmaker, and the most stuck-up girl in town. As the Games begin, Haymitch understands he’s been set up to fail. But there’s something in him that wants to fight . . . and have that fight reverberate far beyond the deadly arena. 
  
//   ` , photo :sunrise},
//   {nameofbook:"THE LAST MONUMENT" ,details:`Outside Denver, Colorado, Joe Rickards stands over a small aircraft wreckage, studying burnt remains still smoldering in a field of freshly fallen snow...an investigator for the NTSB, working to carefully roll back the last several hours and identify the cause of the accident.
//    But this time, he can't.
//    The details behind this tragedy don't add up. Unlike every other investigation of Joe's career, the facts make no sense. Each new piece of information only makes the accident more mysterious, and more baffling.
  
//   ` , photo :thelatestmomement},
//   {nameofbook:"THE NEXT CONVERSATION" ,details:`No matter who you’re talking to, The Next Conversation gives you immediately actionable strategies and phrases that will forever change how you communicate. Jefferson Fisher, trial lawyer and one of the leading voices on real-world communication, offers a tried-and-true framework that will show you how to transform your life and your relationships by improving your next conversation.
//   Fisher has gained millions of followers through short, simple, practical videos teaching people how to argue less and talk more. Whether it’s handling a heated conversation, dealing with a difficult personality, or standing your ground with confidence, his down-to-earth teachings have helped countless people navigate life’s toughest situations. Now for the first time, Fisher has distilled his three-part
//   ` , photo :thenextconversation},
  
  
//   {nameofbook:"THE DESERT OF GLASS" ,details:`Half a century ago, an aberration was spotted by one of our earliest satellites, and summarily dismissed as a hardware malfunction. But it was no aberration. And no malfunction. It was an accidental glimpse of something extraordinary, and very old.
//    Mocked for decades, the man who designed the satellite is now dead. With the system's original data firmly in the hands of former NTSB investigator Joe Rickards and anthropologist Angela Reed.
//    But the data is only to be shared with one other person besides them: a seventy-five-year-old NASA engineer who was part of the original program.
//   ` , photo :thedesertofglass},
  
//   ]


// const CurrentIndex = index? parseInt(index) :0


// function handleCounterIncrease(){
//   setCounter(counter + 1)
// }
// function handleCounterDecrease(){
//   setCounter(counter - 1)
// }






//   return ( <>
  
//   {!bookdetails ? <Loading/> :<>
  
//   <div className="book-details-info flex gap-5 items-center flex-col sm:flex-row p-4">
//       <div className="img">
//         <img className="w-44" src={bookDetailsStatic[CurrentIndex].photo} alt={bookdetails.name} />
//       </div>
//  <div className="book-details-text flex-1">
//  <h2 className="text-gray-700 font-bold mb-2">{bookDetailsStatic[CurrentIndex].nameofbook}</h2>
// <p className="capitalize text-gray-600 mb-4">{bookDetailsStatic[CurrentIndex].details}</p>
// <p className="text-red-900">By {bookdetails.author}</p>
// <div>
// <p>Price: {bookdetails.price} EG</p>
// <div className="rate mb-4">
// <i className="fa-solid fa-star text-yellow-500"></i>
// <i className="fa-solid fa-star text-yellow-500"></i>
// <i className="fa-solid fa-star text-yellow-500"></i>
// <span className="ml-2">4.3</span>
// </div>





// </div>


// <div className="btn-count flex justify-center items-center gap-6 my-3">
//               <button onClick={handleCounterDecrease} className={`cursor-pointer`} disabled={counter === 1}>
//               <i className="fa-solid fa-minus"></i>
//               </button>
//             <span className=" bg-red-600 size-6 grid place-content-center rounded-2xl text-white">{counter}</span>
//             <button onClick={handleCounterIncrease} className={`cursor-pointer`} disabled={counter === 10}>
//               <i className="fa-solid fa-plus"></i>
//               </button>
//             </div>



















// <div className="addbtn">
//   <button onClick={()=>{

// // add item to cart
//                   dispatch(addItemToCart({bookId:id,bookQuantity:counter}))


//   }} className="bg-red-500 rounded-md px-3 py-1 text-white font-bold w-full hover:bg-red-800 transition-colors duration-200 cursor-pointer">Add To Cart</button>
// </div>

//  </div>



    
//   </div>
  
  
  
  
  
//   </>}
  
//   </>
//   )
// }



/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  BookDetailsInfo,
  booksinfo,
  RootState,
} from "../../Interfaces/Interfaces";
import Loading from "../Loading/Loading";
import carlesspeople from "../../assets/images/carlespeople.jpg";
import housemade from "../../assets/images/housemade.jpg";
import theleetthem from "../../assets/images/leetthem.jpg";
import reunion from "../../assets/images/reunion on prague.jpg";
import sunrise from "../../assets/images/sunrise.jpg";
import thelatestmomement from "../../assets/images/thelastmoment.jpg";
import thenextconversation from "../../assets/images/thenextconversation.jpg";
import thedesertofglass from "../../assets/images/thedesertofglass.jpg";
import { AppDispatch } from "../../Redux/Store";
import { addItemToCart } from "../../Redux/CartSlice";

export default function BookDetails() {
  const [counter, setCounter] = useState(1);
  const { id, index } = useParams();
  const [bookdetails, setBookdetails] = useState<BookDetailsInfo | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((store: RootState) => store.userReducer);

  const bookDetailsStatic: booksinfo[] = [
    {
      nameofbook: "Careless People",
      details: `Careless People is darkly funny and genuinely shocking...`,
      photo: carlesspeople,
    },
    {
      nameofbook: "The HOUSE MAID",
      details: `Every day I clean the Winchesters’ beautiful house top to bottom...`,
      photo: housemade,
    },
    {
      nameofbook: "The LEET THEM",
      details: `What if the key to happiness, success, and love was as simple as two words?...`,
      photo: theleetthem,
    },
    {
      nameofbook: "REUNION PRAGUE",
      details: `Everyman spy Alex Kovacs returns to action in Reunion in Prague...`,
      photo: reunion,
    },
    {
      nameofbook: "SUNRISE ON THE REAPING",
      details: `The phenomenal fifth book in the Hunger Games series!...`,
      photo: sunrise,
    },
    {
      nameofbook: "THE LAST MONUMENT",
      details: `Outside Denver, Colorado, Joe Rickards stands over a small aircraft wreckage...`,
      photo: thelatestmomement,
    },
    {
      nameofbook: "THE NEXT CONVERSATION",
      details: `No matter who you’re talking to, The Next Conversation gives you...`,
      photo: thenextconversation,
    },
    {
      nameofbook: "THE DESERT OF GLASS",
      details: `Half a century ago, an aberration was spotted by one of our earliest satellites...`,
      photo: thedesertofglass,
    },
  ];

  const CurrentIndex = index ? parseInt(index) : 0;

  async function getCertainBookById() {
    try {
      const options = {
        url: `https://upskilling-egypt.com:3007/api/book/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      setBookdetails(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCertainBookById();
  }, []);

  function handleCounterIncrease() {
    setCounter((prev) => Math.min(prev + 1, 10));
  }

  function handleCounterDecrease() {
    setCounter((prev) => Math.max(prev - 1, 1));
  }

  return (
    <main className="p-6">
      {!bookdetails ? (
        <Loading />
      ) : (
        <article
          className="book-details-info flex flex-col justify-center items-center sm:flex-row gap-6 p-6 bg-white rounded-xl shadow-md transition-shadow"
          role="region"
          aria-label={`Book details for ${bookDetailsStatic[CurrentIndex].nameofbook}`}
        >
          <figure className="img">
            <img
              className="w-44 h-auto rounded-md shadow-sm"
              src={bookDetailsStatic[CurrentIndex].photo}
              alt={`Cover of the book ${bookdetails.name}`}
            />
          </figure>

          <section className="book-details-text flex-1 space-y-4">
            <header>
              <h2 className="text-2xl font-semibold text-gray-800">
                {bookDetailsStatic[CurrentIndex].nameofbook}
              </h2>
            </header>

            <p className="text-gray-700 leading-relaxed">
              {bookDetailsStatic[CurrentIndex].details}
            </p>

            <p className="text-sm text-gray-500">By {bookdetails.author}</p>
            <p className="text-lg text-red-700 font-medium">
              Price: {bookdetails.price} EG
            </p>

            <div
              className="rate flex items-center gap-2"
              aria-label="User rating 4.3 out of 5"
            >
              {[...Array(3)].map((_, i) => (
                <i
                  key={i}
                  className="fa-solid fa-star text-yellow-500"
                  aria-hidden="true"
                />
              ))}
              <span className="text-sm text-gray-700">4.3</span>
            </div>

            <div
              className="btn-count flex items-center gap-4"
              role="group"
              aria-label="Quantity selector"
            >
              <button
                onClick={handleCounterDecrease}
                disabled={counter === 1}
                aria-label="Decrease quantity"
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
              >
                <i className="fa-solid fa-minus cursor-pointer"></i>
              </button>

              <span className="w-8 h-8 bg-red-600 text-white grid place-content-center rounded-full">
                {counter}
              </span>

              <button
                onClick={handleCounterIncrease}
                disabled={counter === 10}
                aria-label="Increase quantity"
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
              >
                <i className="fa-solid fa-plus cursor-pointer"></i>
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  dispatch(addItemToCart({ bookId: id, bookQuantity: counter }))
                }
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition cursor-pointer"
                aria-label={`Add ${counter} item(s) of ${bookdetails.name} to cart`}
              >
                Add To Cart
              </button>
            </div>
          </section>
        </article>
      )}
    </main>
  );
}
