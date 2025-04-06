import Card from "./Card";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "./StyleComponents/swiper.css";
import chalk from "chalk";

interface Game {
  id: number;
  title: string;
  description: string;
  country: string;
  image: string;
  link: string;
  rating: number;
}

export default function GamesRegion() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("All");

  const countries = ["USA", "Japan"];

  useEffect(() => {
    axios
      .get("") //api
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(chalk.red("Couldn't fetch data:", error));
      });
  }, []);

  const filteredGames =
    selectedCountry === "All"
      ? games
      : games.filter((game) => game.country === selectedCountry);

  return (
    <>
      <h2 className="RegionTitle">
        Games By{" "}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </h2>
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
        className="RegionSwiper"
      >
        {filteredGames.map((game) => (
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
