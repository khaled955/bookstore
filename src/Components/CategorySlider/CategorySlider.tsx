import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import  "swiper/swiper-bundle.css"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

type Category = { _id: string; name: string };

// map names → icons (case/spacing-insensitive)
const ICONS: Record<string, JSX.Element> = {
  "fiction": <i className="fa-solid fa-book-open"></i>,
  "science fiction": <i className="fa-solid fa-robot"></i>,
  "fantasy": <i className="fa-solid fa-hat-wizard"></i>,
  "mystery & thriller": <i className="fa-solid fa-user-secret"></i>,
  "romance": <i className="fa-solid fa-heart"></i>,
  "horror": <i className="fa-solid fa-ghost"></i>,
  "historical fiction": <i className="fa-solid fa-landmark"></i>,
  "biography & memoir": <i className="fa-solid fa-user"></i>,
  "self-help & motivation": <i className="fa-solid fa-hand-holding-heart"></i>,
  "business & finance": <i className="fa-solid fa-chart-line"></i>,
  "technology & ai": <i className="fa-solid fa-microchip"></i>,
  "science & nature": <i className="fa-solid fa-flask"></i>,
  "philosophy & psychology": <i className="fa-solid fa-brain"></i>,
  "health & fitness": <i className="fa-solid fa-heart-pulse"></i>,
  "cookbooks & food": <i className="fa-solid fa-utensils"></i>,
  "travel & adventure": <i className="fa-solid fa-globe"></i>,
  "poetry": <i className="fa-solid fa-feather-pointed"></i>,
  "education & learning": <i className="fa-solid fa-graduation-cap"></i>,
  "children's books": <i className="fa-solid fa-child"></i>,
};

const normalize = (s: string) =>
  s.toLowerCase().replace(/&/g, "&").replace(/\s+/g, " ").trim();

export default function CategorySlider() {


  async function getCategoriesFromApi(): Promise<Category[]> {
    const res = await axios.get("https://upskilling-egypt.com:3007/api/category");
    return res.data as Category[]; // adjust if your API shape differs
  }

  const { data, isLoading, isError} = useQuery({
    queryKey: ["getCategoriesFromApi"],
    queryFn: getCategoriesFromApi,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500 p-4">Failed to load categories.</p>;

  const categories = Array.isArray(data) ? data : [];

  return (
    <Swiper
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      modules={[Autoplay, Pagination, Navigation]}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 5 },
      }}
    >
      {categories.map((category) => {
        const key = normalize(category.name || "");
        const icon = ICONS[key] ?? <i className="fa-solid fa-book"></i>; // safe fallback

        return (
          <SwiperSlide key={category._id}>
            <div className="mt-4">
              <div className="flex flex-col gap-5 items-center shadow-md rounded-xl p-4 bg-white">
                <span className="text-2xl">{icon}</span>
                <p className="text-sm text-gray-700 line-clamp-1">{category.name}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}



