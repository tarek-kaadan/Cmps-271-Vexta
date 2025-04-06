import Card from "./Card";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "./StyleComponents/swiper.css";
import chalk from "chalk";

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  rating: number;
}

export default function Recommendation() {
  const [games, setGame] = useState<Game[]>([]);
  useEffect(() => {
    axios
      .get("") //api
      .then((res) => {
        setGame(res.data);
      })
      .catch((error) => {
        console.log(chalk.red("could not fetch data:", error));
      });
  });
  return (
    <>
      <h2 className="RecomTitle">Recommendations</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          640: { slidesPerView: 2 },
          870: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="RecomSwiper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <Card
              title={game.title}
              description={game.description}
              image={game.image}
              link={game.link}
              rating={game.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
