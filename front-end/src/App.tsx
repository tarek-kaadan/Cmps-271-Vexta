import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Recommendations from "./components/Recommendations";
import "./index.css";
import GamesGenre from "./components/GamesGenre";
import GamesRegion from "./components/GamesRegion";
import BigImage from "./components/BigImage";
export default function App() {
  return (
    <>
      <Header />
      <BigImage />
      <Recommendations />
      <GamesGenre />
      <GamesRegion />
      <Footer />
    </>
  );
}
