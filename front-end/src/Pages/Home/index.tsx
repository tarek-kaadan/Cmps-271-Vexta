import Culture from "../../components/Culture/Culture";
import GamesGenre from "../../components/filterSection/gameFilter";
import ImageSlider from "../../components/heroSection/ImageSlider";

const Home = () => {
  return (
    <>
      <ImageSlider />
      {/* <Recommendations /> */}
      <GamesGenre />
      <Culture />
    </>
  );
};

export default Home;
