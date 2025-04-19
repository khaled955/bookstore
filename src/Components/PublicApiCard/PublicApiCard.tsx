import { Link } from "react-router-dom";
import { dbookdata } from "../../Interfaces/Interfaces";

export default function PublicApiCard({bookInfo}:{bookInfo:dbookdata}) {
  return (
  <>

  <Link
      to={`/trendingdetailsbooks/${bookInfo.id}`}
      className="group relative flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      {/* Book Image */}
      <div className="w-full h-60 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          className="h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={bookInfo.image}
          alt={bookInfo.title}
        />
      </div>

      {/* Book Details */}
      <div className="w-full p-4 text-center">
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {bookInfo.title}
        </h2>
        <p className="text-sm text-gray-500 truncate">
          {bookInfo.subtitle || "Architecting Cloud Native Data"}
        </p>

        {/* Author Section */}
        <p className="text-xs font-medium text-gray-600 mt-2 uppercase">
          By <span className="text-red-600">{bookInfo.authors}</span>
        </p>
      </div>
    </Link>





  </>
  )
}
