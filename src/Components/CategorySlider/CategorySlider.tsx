import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
import  "swiper/swiper-bundle.css"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Loading from "../Loading/Loading";
import { categorySlide } from "../../Interfaces/Interfaces";
import { useQuery } from "@tanstack/react-query";


export default function CategorySlider() {


    const categoriesList = [
        { name: "Fiction", icon: <i className="fa-solid fa-book-open"></i> },
        { name: "Science Fiction", icon: <i className="fa-solid fa-robot"></i>},
        { name: "Fantasy", icon: <i className="fa-solid fa-hat-wizard"></i> },
        { name: "Mystery & Thriller", icon: <i className="fa-solid fa-user-secret"></i> },
        { name: "Romance", icon: <i className="fa-solid fa-heart"></i> },
        { name: "Horror", icon: <i className="fa-solid fa-ghost"></i>},
        { name: "Historical Fiction", icon:<i className="fa-solid fa-landmark"></i>},
        { name: "Biography & Memoir", icon: <i className="fa-solid fa-user"></i>},
        { name: "Self-Help & Motivation", icon: <i className="fa-solid fa-hand-holding-heart"></i> },
        { name: "Business & Finance", icon: <i className="fa-solid fa-chart-line"></i> },
        { name: "Technology & AI", icon: <i className="fa-solid fa-microchip"></i> },
        { name: "Science & Nature", icon: <i className="fa-solid fa-flask"></i> },
        { name: "Philosophy & Psychology", icon: <i className="fa-solid fa-brain"></i> },
        { name: "Health & Fitness", icon: <i className="fa-solid fa-heart-pulse"></i> },
        { name: "Cookbooks & Food", icon: <i className="fa-solid fa-utensils"></i> },
        { name: "Travel & Adventure", icon: <i className="fa-solid fa-globe"></i> },
        { name: "Poetry", icon: <i className="fa-solid fa-feather-pointed"></i> },
        { name: "Education & Learning", icon: <i className="fa-solid fa-graduation-cap"></i> },
        { name: "Children's Books", icon: <i className="fa-solid fa-child"></i>},
      ];










    function getCategoriesFromApi(){
  
      return axios
      .get("https://upskilling-egypt.com:3007/api/category")
      .then((res) => res.data);
      }
    
    
      const {data,isLoading} = useQuery({
        queryKey:["getCategoriesFromApi"],
        queryFn:getCategoriesFromApi,
        refetchOnMount: false, // Prevents refetch when remounting
        refetchOnWindowFocus: false, // Prevents refetch when switching tabs
        staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
        cacheTime: 1000 * 60 * 60 * 24,
      
      })
    
    
     
    if (isLoading) {
      return <Loading/>
    }
    


  return (
 <>
 <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              scrollbar={{ draggable: true }}
              loop={true}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
            <>
            {  data.map((category:categorySlide ,index:number )=> <SwiperSlide key={category._id}>
            <div className="mt-4 ">
           <div className="flex flex-col gap-5 items-center shadow-md">
           <span className="text-2xl">{categoriesList[index].icon}</span>
            <p className="text-sm text-gray-700 line-clamp-1">{categoriesList[index].name}</p>
            
             
           </div>
            </div>
            </SwiperSlide>)}
            
            
            </>
        
            </Swiper>
 
 </>
  )
}
