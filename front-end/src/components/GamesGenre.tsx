import Card from "./Card";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useState, useEffect } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./StyleComponents/swiper.css";
import chalk from "chalk";

interface Game {
  id: number;
  title: string;
  description: string;
  genre: string;
  image: string;
  link: string;
  rating: number;
}

export default function GamesGenre() {
  const [games, setGame] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenres] = useState("All");

  const genres = ["Open World", "strategy"];
  useEffect(() => {
    axios
      .get("") //api
      .then((res) => {
        setGame(res.data);
      })
      .catch((error) => {
        console.log(chalk.red("could not fetch data:", error));
      });
  }, []);

  const FilteredGames =
    selectedGenre === "All"
      ? games
      : games.filter((game) => selectedGenre === game.genre);

  return (
    <>
      <h2 className="GenreTitle">
        Games By{" "}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenres(e.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
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
        className="GenreSwiper"
      >
        {FilteredGames.map((game) => (
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
