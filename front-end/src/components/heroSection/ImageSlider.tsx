import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BigImage from "./bigDiv/BigImage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Game {
  id: number;
  title: string;
  link: string;
  image?: string;
  sliderImage?: string;
}

const Slider: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/games")
      .then((response) => {
        const filtered = response.data.filter((game: Game) => game.sliderImage);
        setGames(filtered);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);

  return (
    <Swiper
      style={{ top: "-75px", height: "600px" }}
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
    >
      {games.map((game) => (
        <SwiperSlide key={game.id}>
          <BigImage
            name={game.title}
            image={game.sliderImage!}
            link={game.link}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
