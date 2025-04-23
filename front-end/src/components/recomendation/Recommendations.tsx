import Card from "../filterSection/Card/Card";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config'; 

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
        <>
        <Seperator text={"Recomendations"} margintop={-60} />
        <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        loop
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        //className="RecomSwiper"
        style={{ padding: '20px 0', display: 'flex', justifyContent: 'center' }}
      >
        {games.slice(0, 10).map((game) => (
          <SwiperSlide key={game.id} 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Card
              key={game._id}
              _id={game._id}
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </>
      ) : (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{border: "1px solid hsla(0, 0%, 0%, 0.05)" ,borderRadius: "30px", padding: "20px", width: "500px", height: "75px", background: "linear-gradient(to right, #00ff87, #60efff)", boxShadow: '5px 5px 5px hsla(0, 0%, 0%, 0.056)'}}>
            <p style={{display: "flex", justifyContent: "center", alignItems: "flex-center", color: "white", fontSize: "20px", fontWeight: "bold"}}>Please login to see recommendations</p>
          </div>
        </div>
      )}
      </>
  );
}
