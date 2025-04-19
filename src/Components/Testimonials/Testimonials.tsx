

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";

import photo1 from "../../assets/images/1.jpg";
import photo2 from "../../assets/images/2.jpeg";
import photo3 from "../../assets/images/3.jpg";
import photo5 from "../../assets/images/5.jpg";
import photo6 from "../../assets/images/6.jpg";

const testimonials = [
  {
    name: "John Matthews – Avid Book Collector",
    text: `"This bookstore has the most well-curated selection I've seen. Every visit feels like a treasure hunt."`,
    rating: 4.9,
    image: photo1,
  },
  {
    name: "Sophia Carter – Mystery Lover",
    text: `"I’m a huge fan of mystery novels, and this store never disappoints. I also love their book club!"`,
    rating: 4.7,
    image: photo2,
  },
  {
    name: "Liam Anderson – Student & Researcher",
    text: `"This store offers a great range of academic and second-hand books. Customer service is excellent!"`,
    rating: 4.7,
    image: photo3,
  },
  {
    name: "Emma Rodriguez – Children's Book Enthusiast",
    text: `"The story time events are fantastic, and the children’s book collection is top-tier!"`,
    rating: 4.8,
    image: photo5,
  },
  {
    name: "Lucas White – Historical Fiction Fan",
    text: `"A great place to discover new titles. Friendly staff and cozy vibe!"`,
    rating: 4.9,
    image: photo6,
  },
];

export default function Testimonials() {
  return (
    <section className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">What Our Readers Say</h2>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-500 ease-in-out hover:scale-[1.01] animate-[fadeIn_0.8s_ease-in-out]">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-200 shadow-sm mb-5">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.name}</h3>
              <p className="text-gray-600 italic px-4 max-w-xl">“{t.text}”</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-star ${
                      i < Math.floor(t.rating) ? "text-yellow-500" : "text-gray-300"
                    }`}
                  ></i>
                ))}
                <span className="ml-2 text-gray-700 font-medium">{t.rating.toFixed(1)}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
