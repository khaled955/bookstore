
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { dbookdata, RootState } from "../../Interfaces/Interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function TrendingBooks() {
  const { token } = useSelector((store: RootState) => store.userReducer);
  const { showLoginForm } = authSliceActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getDataFrom() {
    return axios.get("https://www.dbooks.org/api/recent");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["booksFromdBooksApi"],
    queryFn: getDataFrom,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-6 px-3" aria-labelledby="trending-books-heading">
      <hr className="opacity-25 mb-4" />
      <h2
        id="trending-books-heading"
        className="text-2xl font-semibold text-gray-800 flex items-center gap-2"
      >
        <i className="fa-solid fa-fire text-red-500"></i>
        Trending Now
      </h2>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        className="mt-4"
      >
        {data?.data.books.map((book: dbookdata) => (
          <SwiperSlide key={book.id}>
            <motion.button
              onClick={() => {
                if (!token) {
                  dispatch(showLoginForm());
                  localStorage.setItem(
                    "currentPath",
                    `/trendingdetailsbooks/${book.id}`
                  );
                } else {
                  navigate(`/trendingdetailsbooks/${book.id}`);
                }
              }}
              className="group block p-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg bg-white cursor-pointer"
              aria-label={`View details for ${book.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex justify-center items-center mb-2">
                <img
                  className="h-40 object-contain rounded-md"
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-1">
                  {book.title}
                </h3>
              </div>
            </motion.button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
