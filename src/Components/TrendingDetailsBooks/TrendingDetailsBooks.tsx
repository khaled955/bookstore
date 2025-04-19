/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCalendarAlt, faFile, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { BookDataFromPublicApi } from "../../Interfaces/Interfaces";

export default function TrendingDetailsBooks() {

const {trendId} = useParams()
const [publicBookDetails , setPublicBookDetails] = useState<BookDataFromPublicApi | null>(null)

const currentTrendId = trendId?.match(/[0-9]{0,}/)



async function getBooksDetailsFromPublicApi(){

try {
  
  const {data} = await axios.get(`https://www.dbooks.org/api/book/${currentTrendId}`)
     
setPublicBookDetails(data)

} catch (error) {
  console.log(error)
}




}


useEffect(()=>{

  getBooksDetailsFromPublicApi()

},[])


//max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300

  return (
  <>
  {!publicBookDetails ?<Loading/> : <>
  
    <div className=" py-4 box-container flex gap-4 flex-col sm:flex-row">
      {/* Book Cover */}
      <div className="img-box">
      <img src={publicBookDetails.image} alt={publicBookDetails.title} className="w-full" />
      </div>

      {/* Book Details */}
      <div className="space-y-8 px-3">
        <div>
        <h2 className="text-xl font-bold text-gray-800">{publicBookDetails.title}</h2>
        <p className="text-gray-500 text-sm">{publicBookDetails.subtitle}</p>

        </div>
        <p className="mt-2 text-gray-600 text-sm">
          <span className="font-semibold">Authors:</span> {publicBookDetails.authors}
        </p>

        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{publicBookDetails.description}</p>

        {/* Book Metadata */}
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-700">
          <p className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-500" /> {publicBookDetails.publisher}
          </p>
          <p className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500" /> {publicBookDetails.year}
          </p>
          <p className="flex items-center gap-1">
            <FontAwesomeIcon icon={faFile} className="text-purple-500" /> {publicBookDetails.pages} Pages
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <a
            href={publicBookDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            View Book
          </a>
          <a
            href={publicBookDetails.download}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            <FontAwesomeIcon icon={faDownload} /> Download
          </a>
        </div>
      </div>
    </div>
  
  
  
  
  
  
  
  
  </>}
  
  
  
  
  
  
  </>
  )
}

