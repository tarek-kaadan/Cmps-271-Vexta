import { Autoplay, Navigation, Pagination } from "swiper/modules";
import BigImage from "./BigImage";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      className="ImageSlider"
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <BigImage />
      </SwiperSlide>
      <SwiperSlide>
        <BigImage />
      </SwiperSlide>
      <SwiperSlide>
        <BigImage />
      </SwiperSlide>
      <SwiperSlide>
        <BigImage />
      </SwiperSlide>
      ...
    </Swiper>
  );
};
