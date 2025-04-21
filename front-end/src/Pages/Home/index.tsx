import GamesGenre from '../../components/filterSection/gameFilter';
import ImageSlider from '../../components/heroSection/ImageSlider';
import Recommendations from '../../components/recomendation/Recommendations';

const Home = () => {
  return (
    <>
      <ImageSlider />
      {/* <Recommendations /> */}
      <GamesGenre />
    </>
  );
};

export default Home;
