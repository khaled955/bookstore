/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../Loading/Loading"
import Card from "../Card/Card"
import carlesspeople from "../../assets/images/carlespeople.jpg"
import housemade from "../../assets/images/housemade.jpg"
import theleetthem from "../../assets/images/leetthem.jpg"
import reunion from "../../assets/images/reunion on prague.jpg"
import sunrise from "../../assets/images/sunrise.jpg"
import thelatestmomement from "../../assets/images/thelastmoment.jpg"
import thenextconversation from "../../assets/images/thenextconversation.jpg"
import thedesertofglass from "../../assets/images/thedesertofglass.jpg"
import { Book, booksinfo, dbookdata } from "../../Interfaces/Interfaces"
import PublicApiCard from "../PublicApiCard/PublicApiCard"
import { useCallback, useEffect, useState } from "react"
import debounce from "lodash/debounce";


  
export default function Allbooks() {

  // static data for upskilling book
  const bookDetails:booksinfo[] = [{nameofbook:"Careless People" ,details:`Careless People is darkly funny and genuinely shocking...Not only does [Sarah Wynn-Williams] have the storytelling chops to unspool a gripping narrative; she also delivers the goods." -Jennifer Szalai, The New York Times
    “When one of the world’s most powerful media companies tries to snuff out a book ― amid other alarming attacks on free speech in America like this ― it’s time to pull out all the stops.” –Ron Charles, The Washington Post
     An explosive memoir charting one woman’s career at the heart of one of the most influential companies on the planet, Careless People gives you a front-row seat to Facebook, the decisions that have shaped world events in recent decades, and the people who made them.` , photo :carlesspeople},
    
     {nameofbook:"The HOUSE MAID" ,details:`Every day I clean the Winchesters’ beautiful house top to bottom. I collect their daughter from school. And I cook a delicious meal for the whole family before heading up to eat alone in my tiny room on the top floor.
    I try to ignore how Nina makes a mess just to watch me clean it up. How she tells strange lies about her own daughter. And how her husband Andrew seems more broken every day. But as I look into Andrew’s` , photo :housemade},
    
    {nameofbook:"The LEET THEM" ,details:`What if the key to happiness, success, and love was as simple as two words?
    If you've ever felt stuck, overwhelmed, or frustrated with where you are, the problem isn't you. The problem is the power you give to other people. Two simple words—Let Them—will set you free. Free from the opinions, drama, and judgments of others. Free from the exhausting cycle of trying to manage everything and everyone around you. The Let Them Theory puts the power to create a life you love back in your hands—and this book will show you exactly how to do it.
    In her latest groundbreaking book, The Let Them Theory, Mel Robbins—New York Times bestselling author and one of the world's most respected experts on motivation, confidence, and mindset—teaches you how to stop wasting energy on what you can't control and start focusing on what truly matters: YOU. Your happiness. Your goals. Your life.
    ` , photo :theleetthem},
    
    {nameofbook:"REUNION PRAGUE" ,details:`Everyman spy Alex Kovacs returns to action in Reunion in Prague, the 13th book in a series that has earned more than 15,000 5-star reviews. This time, he visits his home country, the place where he was born, the place that he turned his back on at age 16 for a new life with his uncle in Vienna.
    Prague, several years after the war, has been consumed by its Communist oppressors. Private enterprise is being eliminated. The secret police have begun to follow in the footsteps of their masters, the KGB. Show trials of “enemies of the state” have become a macabre form of popular entertainment. And Alex’s employers at the Gehlen Organization are anxious for inside information from behind this particularly
    
    ` , photo :reunion},
    
    {nameofbook:"SUNRISE ON THE REAPING" ,details:`The phenomenal fifth book in the Hunger Games series!
     When you’ve been set up to lose everything you love, what is there left to fight for?
     As the day dawns on the fiftieth annual Hunger Games, fear grips the districts of Panem. This year, in honor of the Quarter Quell, twice as many tributes will be taken from their homes.
     Back in District 12, Haymitch Abernathy is trying not to think too hard about his chances. All he cares about is making it through the day and being with the girl he loves.
     When Haymitch’s name is called, he can feel all his dreams break. He’s torn from his family and his love, shuttled to the Capitol with the three other District 12 tributes: a young friend who’s nearly a sister to him, a compulsive oddsmaker, and the most stuck-up girl in town. As the Games begin, Haymitch understands he’s been set up to fail. But there’s something in him that wants to fight . . . and have that fight reverberate far beyond the deadly arena. 
    
    ` , photo :sunrise},
    {nameofbook:"THE LAST MONUMENT" ,details:`Outside Denver, Colorado, Joe Rickards stands over a small aircraft wreckage, studying burnt remains still smoldering in a field of freshly fallen snow...an investigator for the NTSB, working to carefully roll back the last several hours and identify the cause of the accident.
     But this time, he can't.
     The details behind this tragedy don't add up. Unlike every other investigation of Joe's career, the facts make no sense. Each new piece of information only makes the accident more mysterious, and more baffling.
    
    ` , photo :thelatestmomement},
    {nameofbook:"THE NEXT CONVERSATION" ,details:`No matter who you’re talking to, The Next Conversation gives you immediately actionable strategies and phrases that will forever change how you communicate. Jefferson Fisher, trial lawyer and one of the leading voices on real-world communication, offers a tried-and-true framework that will show you how to transform your life and your relationships by improving your next conversation.
    Fisher has gained millions of followers through short, simple, practical videos teaching people how to argue less and talk more. Whether it’s handling a heated conversation, dealing with a difficult personality, or standing your ground with confidence, his down-to-earth teachings have helped countless people navigate life’s toughest situations. Now for the first time, Fisher has distilled his three-part
    ` , photo :thenextconversation},
    
    
    {nameofbook:"THE DESERT OF GLASS" ,details:`Half a century ago, an aberration was spotted by one of our earliest satellites, and summarily dismissed as a hardware malfunction. But it was no aberration. And no malfunction. It was an accidental glimpse of something extraordinary, and very old.
     Mocked for decades, the man who designed the satellite is now dead. With the system's original data firmly in the hands of former NTSB investigator Joe Rickards and anthropologist Angela Reed.
     But the data is only to be shared with one other person besides them: a seventy-five-year-old NASA engineer who was part of the original program.
    ` , photo :thedesertofglass},


     {nameofbook:"REUNION PRAGUE" ,details:`Everyman spy Alex Kovacs returns to action in Reunion in Prague, the 13th book in a series that has earned more than 15,000 5-star reviews. This time, he visits his home country, the place where he was born, the place that he turned his back on at age 16 for a new life with his uncle in Vienna.
    Prague, several years after the war, has been consumed by its Communist oppressors. Private enterprise is being eliminated. The secret police have begun to follow in the footsteps of their masters, the KGB. Show trials of “enemies of the state” have become a macabre form of popular entertainment. And Alex’s employers at the Gehlen Organization are anxious for inside information from behind this particularly
    
    ` , photo :reunion},
     {nameofbook:"THE LAST MONUMENT" ,details:`Outside Denver, Colorado, Joe Rickards stands over a small aircraft wreckage, studying burnt remains still smoldering in a field of freshly fallen snow...an investigator for the NTSB, working to carefully roll back the last several hours and identify the cause of the accident.
     But this time, he can't.
     The details behind this tragedy don't add up. Unlike every other investigation of Joe's career, the facts make no sense. Each new piece of information only makes the accident more mysterious, and more baffling.
    
    ` , photo :thelatestmomement},
    {nameofbook:"THE NEXT CONVERSATION" ,details:`No matter who you’re talking to, The Next Conversation gives you immediately actionable strategies and phrases that will forever change how you communicate. Jefferson Fisher, trial lawyer and one of the leading voices on real-world communication, offers a tried-and-true framework that will show you how to transform your life and your relationships by improving your next conversation.
    Fisher has gained millions of followers through short, simple, practical videos teaching people how to argue less and talk more. Whether it’s handling a heated conversation, dealing with a difficult personality, or standing your ground with confidence, his down-to-earth teachings have helped countless people navigate life’s toughest situations. Now for the first time, Fisher has distilled his three-part
    ` , photo :thenextconversation},
    
    ]




  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filteredPublicBooks, setFilteredPublicBooks] = useState<dbookdata[]>([]);
  async function getDataFromUpskillingApi() {
    return axios.get("https://upskilling-egypt.com:3007/api/book");
  }

  async function getDataFromPublicApi() {
    return axios.get("https://www.dbooks.org/api/recent");
  }

  const { data: apiUpskillings, isLoading: upskillingLoading } = useQuery({
    queryKey: ["AllApisbooks"],
    queryFn: getDataFromUpskillingApi,
    staleTime: 24 * 60 * 60 * 1000,
    retry: true,
  });

  const { data: publicApi, isLoading: publicApiLoading } = useQuery({
    queryKey: ["publicApiBooks"],
    queryFn: getDataFromPublicApi,
    staleTime: 24 * 60 * 60 * 1000,
    retry: true,
  });

  // Debounced search function
  const handleSearch = useCallback(
    debounce((query) => {
      if (!query) {
        setFilteredBooks(apiUpskillings?.data.data || []);
        setFilteredPublicBooks(publicApi?.data.books || []);
        return;
      }

      const filteredApiBooks =
        apiUpskillings?.data.data.filter((book: Book) =>
          book.name.toLowerCase().includes(query.toLowerCase())
        ) || [];
        
     
      const filteredPublic =
        publicApi?.data.books.filter((book: dbookdata) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        ) || [];

      setFilteredBooks(filteredApiBooks);
      setFilteredPublicBooks(filteredPublic);
    }, 500), // Debounce delay: 500ms
    [apiUpskillings, publicApi]
  );

  // Run search effect when search term changes
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  if (upskillingLoading || publicApiLoading) {
    return <Loading />;
  }



  return (
    <>
      {/* 🔍 Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)

            
          }
          }
          className="w-96 p-3 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>

      {/* 📚 Upskilling Books */}
      <div className="upskillingbooks p-3">
        <h2 className="text-2xl text-gray-600">Available Now</h2>

        {filteredBooks.length === 0 && filteredPublicBooks.length === 0 && <p className="text-center text-red-500 text-lg mt-4">Oops! No book Matches With Your Search</p>}


        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
          {filteredBooks.map((product: Book,index) => (
            <Card key={product._id} productInfo={product} books={bookDetails[index]} index={index}/>
          ))}
        </div>
        <hr className="opacity-20" />
      </div>

      {/* 📚 Public API Books */}
      <div className="public-api-books mt-2 p-3">
        <h2 className="text-2xl text-gray-500 mb-5">Available Soon</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPublicBooks.map((book: dbookdata) => (
            <PublicApiCard key={book.id} bookInfo={book} />
          ))}
        </div>
      </div>
    </>
  );
}
