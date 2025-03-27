import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recommendations from "./components/Recommendations";
import GamesGenre from "./components/GamesGenre";
import GamesRegion from "./components/GamesRegion";
import ImageSlider from "./components/ImageSlider";
import "./index.css";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <ImageSlider />
      <Recommendations />
      <GamesGenre />
      <GamesRegion />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
