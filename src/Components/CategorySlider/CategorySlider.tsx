import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import  "swiper/swiper-bundle.css"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

type Category = { _id: string; name: string };




const categoryList:{icon:JSX.Element,name:string}[] = [
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-graduation-cap"></i>,name:"education & learning"},
  {icon:<i className="fa-solid fa-feather-pointed"></i>,name:"poetry"},
  {icon:<i className="fa-solid fa-globe"></i>,name:"travel & adventure"},
  {icon:<i className="fa-solid fa-utensils"></i>,name:"cookbooks & food"},
  {icon:<i className="fa-solid fa-heart-pulse"></i>,name: "health & fitness"},
  {icon:<i className="fa-solid fa-brain"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {name:"fiction",icon: <i className="fa-solid fa-book-open"></i>},
  {name:"science fiction",icon: <i className="fa-solid fa-robot"></i>},
{  name:"fantasy",icon: <i className="fa-solid fa-hat-wizard"></i>},
 { name:"mystery & thriller",icon: <i className="fa-solid fa-user-secret"></i>},
 { name:"romance",icon: <i className="fa-solid fa-heart"></i>},
  {name:"horror",icon :<i className="fa-solid fa-ghost"></i>},
  {name:"historical fiction",icon: <i className="fa-solid fa-landmark"></i>},
 { name:"biography & memoir",icon: <i className="fa-solid fa-user"></i>},
{ name: "self-help & motivation",icon: <i className="fa-solid fa-hand-holding-heart"></i>},
  {name:"business & finance",icon: <i className="fa-solid fa-chart-line"></i>},
 {name: "technology & ai",icon: <i className="fa-solid fa-microchip"></i>},
  {name:"science & nature",icon: <i className="fa-solid fa-flask"></i>},
 {name: "philosophy & psychology",icon: <i className="fa-solid fa-brain"></i>},
  {name:"health & fitness",icon: <i className="fa-solid fa-heart-pulse"></i>},
  {name:"cookbooks & food",icon: <i className="fa-solid fa-utensils"></i>},
  {name:"travel & adventure",icon: <i className="fa-solid fa-globe"></i>},
  {name:"poetry",icon: <i className="fa-solid fa-feather-pointed"></i>},
  {name:"education & learning",icon: <i className="fa-solid fa-graduation-cap"></i>},
  {name:"children's books",icon: <i className="fa-solid fa-child"></i>},

  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-graduation-cap"></i>,name:"education & learning"},
  {icon:<i className="fa-solid fa-feather-pointed"></i>,name:"poetry"},
  {icon:<i className="fa-solid fa-globe"></i>,name:"travel & adventure"},
  {icon:<i className="fa-solid fa-utensils"></i>,name:"cookbooks & food"},
  {icon:<i className="fa-solid fa-heart-pulse"></i>,name: "health & fitness"},
  {icon:<i className="fa-solid fa-brain"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {name:"fiction",icon: <i className="fa-solid fa-book-open"></i>},
  {name:"science fiction",icon: <i className="fa-solid fa-robot"></i>},
{  name:"fantasy",icon: <i className="fa-solid fa-hat-wizard"></i>},
 { name:"mystery & thriller",icon: <i className="fa-solid fa-user-secret"></i>},
 { name:"romance",icon: <i className="fa-solid fa-heart"></i>},
  {name:"horror",icon :<i className="fa-solid fa-ghost"></i>},
  {name:"historical fiction",icon: <i className="fa-solid fa-landmark"></i>},
 { name:"biography & memoir",icon: <i className="fa-solid fa-user"></i>},
{ name: "self-help & motivation",icon: <i className="fa-solid fa-hand-holding-heart"></i>},
  {name:"business & finance",icon: <i className="fa-solid fa-chart-line"></i>},
 {name: "technology & ai",icon: <i className="fa-solid fa-microchip"></i>},
  {name:"science & nature",icon: <i className="fa-solid fa-flask"></i>},
 {name: "philosophy & psychology",icon: <i className="fa-solid fa-brain"></i>},
  {name:"health & fitness",icon: <i className="fa-solid fa-heart-pulse"></i>},
  {name:"cookbooks & food",icon: <i className="fa-solid fa-utensils"></i>},
  {name:"travel & adventure",icon: <i className="fa-solid fa-globe"></i>},
  {name:"poetry",icon: <i className="fa-solid fa-feather-pointed"></i>},
  {name:"education & learning",icon: <i className="fa-solid fa-graduation-cap"></i>},
  {name:"children's books",icon: <i className="fa-solid fa-child"></i>},

  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-graduation-cap"></i>,name:"education & learning"},
  {icon:<i className="fa-solid fa-feather-pointed"></i>,name:"poetry"},
  {icon:<i className="fa-solid fa-globe"></i>,name:"travel & adventure"},
  {icon:<i className="fa-solid fa-utensils"></i>,name:"cookbooks & food"},
  {icon:<i className="fa-solid fa-heart-pulse"></i>,name: "health & fitness"},
  {icon:<i className="fa-solid fa-brain"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {icon:<i className="fa-solid fa-child"></i>,name:"children's books"},
  {name:"fiction",icon: <i className="fa-solid fa-book-open"></i>},
  {name:"science fiction",icon: <i className="fa-solid fa-robot"></i>},
{  name:"fantasy",icon: <i className="fa-solid fa-hat-wizard"></i>},
 { name:"mystery & thriller",icon: <i className="fa-solid fa-user-secret"></i>},
 { name:"romance",icon: <i className="fa-solid fa-heart"></i>},
  {name:"horror",icon :<i className="fa-solid fa-ghost"></i>},
  {name:"historical fiction",icon: <i className="fa-solid fa-landmark"></i>},
 { name:"biography & memoir",icon: <i className="fa-solid fa-user"></i>},
{ name: "self-help & motivation",icon: <i className="fa-solid fa-hand-holding-heart"></i>},
  {name:"business & finance",icon: <i className="fa-solid fa-chart-line"></i>},
 {name: "technology & ai",icon: <i className="fa-solid fa-microchip"></i>},
  {name:"science & nature",icon: <i className="fa-solid fa-flask"></i>},
 {name: "philosophy & psychology",icon: <i className="fa-solid fa-brain"></i>},
  {name:"health & fitness",icon: <i className="fa-solid fa-heart-pulse"></i>},
  {name:"cookbooks & food",icon: <i className="fa-solid fa-utensils"></i>},
  {name:"travel & adventure",icon: <i className="fa-solid fa-globe"></i>},
  {name:"poetry",icon: <i className="fa-solid fa-feather-pointed"></i>},
  {name:"education & learning",icon: <i className="fa-solid fa-graduation-cap"></i>},
  {name:"children's books",icon: <i className="fa-solid fa-child"></i>},






]






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
      {categories.map((category,index) => {

        return (
          <SwiperSlide key={category._id}>
            <div className="mt-4">
              <div className="flex flex-col gap-5 items-center shadow-md rounded-xl p-4 bg-white">
                <span className="text-2xl">{categoryList[index].icon}</span>
                <p className="text-sm text-gray-700 line-clamp-1">{categoryList[index].name}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}



