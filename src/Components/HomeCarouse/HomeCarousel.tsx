
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { SlideProp } from '../../Interfaces/Interfaces';

export default function HomeCarousel() {
  function getbooksFromGoogleApi() {
    return axios
      .get('https://openlibrary.org/subjects/science_fiction.json?limit=10')
      .then((res) => res.data);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['homeSlider'],
    queryFn: getbooksFromGoogleApi,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <Loading />;

  return (
    <section
      className="w-full my-5"
      aria-label="Featured Books Carousel"
      role="region"
    >
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {data.works.map((slide: SlideProp) => (
          <SwiperSlide key={slide.cover_id}>
            <article
              className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-lg"
              aria-label={`Book: ${slide.title} by ${slide.authors[0]?.name}`}
              role="group"
            >
              <img
                src={`https://covers.openlibrary.org/b/id/${slide.cover_id}-L.jpg`}
                alt={`Cover of ${slide.title}`}
                className="h-full w-full object-cover brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-10 left-6 text-white max-w-[90%]">
                <h2 className="text-3xl font-extrabold drop-shadow-md">{slide.title}</h2>
                <p className="text-lg italic mt-1">{slide.authors[0]?.name}</p>
                <p className="text-sm mt-1 text-gray-300">
                  First Published: {slide.first_publish_year}
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
