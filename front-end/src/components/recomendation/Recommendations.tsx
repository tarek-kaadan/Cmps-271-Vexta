import Card from "../filterSection/Card/Card";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import Game from "../../data/interfaces/GameInterface";
import Seperator from "../seperator";

export default function Recommendation() {
  const [games, setGame] = useState<Game[]>([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!userId || !token) return;

    axios
      .get(`http://localhost:5001/api/recommendations/${userId}`, {
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
      {/* // islogged in ? */}
      <Seperator text={"Recomendations"} margintop={-60} />
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
        style={{ padding: "20px" }}
      >
        {games.slice(0, 10).map((game) => (
          <SwiperSlide key={game.id}>
            <Card
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
    // if not logged in
    // null
  );
}
