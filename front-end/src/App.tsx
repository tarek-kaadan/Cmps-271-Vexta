import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/Login";
import SignupPage from "./components/signup/Signup";
import FriendSearch from "./components/friends/FriendSearch";
import FriendsList from "./components/friends/FriendList";
import GameDetail from "./components/gameDetails/GameDetail";
import "./index.css";
import AllGames from "./Pages/allGames/AllGames";
import AboutPage from "./Pages/AboutUs/AboutPage";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";
import ChooseCategories from "./components/categories";
import ChangeProfilePicture from "./components/profilePicture/ChangeProfilePictire";
import BookmarkedGames from "./components/filterSection/BookmarkedGames";
import ProfilePage from "./components/profilePage/ProfilePage";
import Map from "./Pages/Map";
import CountryGamesPage from "./Pages/CountryGamesPage";
import PinEntry from "./components/NewGames/PinEntry";
import AddGame from "./components/NewGames/AddGame";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/friends" element={<FriendSearch />} />
          <Route path="/my-friends" element={<FriendsList />} />
          <Route path="/games/title/:title" element={<GameDetail />} />
          <Route path="/choose-categories" element={<ChooseCategories />} />
          <Route path="/All-Games" element={<AllGames />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/country/:countryName" element={<CountryGamesPage />} />
          <Route
            path="/change-profile-picture"
            element={<ChangeProfilePicture />}
          />
          <Route path="/bookmarked" element={<BookmarkedGames />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/enter-pin" element={<PinEntry />} />
          <Route path="/add-game" element={<AddGame />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
