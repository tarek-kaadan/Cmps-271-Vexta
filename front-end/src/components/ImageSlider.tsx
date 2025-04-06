import { useState, useEffect } from "react";
import axios from "axios";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import BigImage from "./BigImage";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import chalk from "chalk";

interface Game {
  id: number;
  title: string;
  image: string;
  link: string;
}

export default () => {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error(chalk.red("Error fetching game data:", error));
      });
  }, []);

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
      {games.map((game) => (
        <SwiperSlide key={game.id}>
          <BigImage name={game.title} image={game.image} link={game.link} />
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};
