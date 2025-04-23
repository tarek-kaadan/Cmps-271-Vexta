import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BigImage from "./bigDiv/BigImage";
import heroImage from "/images/Mancala.png";
import { API_BASE_URL } from '../../config'; 

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
  const [games, setGame] = useState<Game[]>([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!userId || !token) return;

    axios
      .get(`${API_BASE_URL}${userId}`, {
        headers: { token: `Bearer ${token}` },
      })
      .then((res) => {
        setGame(res.data);
        console.log("data fetched");
      })
      .catch((error) => {
        console.log("could not fetch data:", error);
      });
  }, []);

  return (
    <>
      {games.length > 0 ? (
        <Swiper
          style={{ marginTop: "-20px", height: "600px" }}
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
      ) : (
        <BigImage
          name={"Discover our Big colletion of games"}
          image={heroImage}
          margintop="-10px"
        />
      )}
    </>
  );
};

export default Slider;
