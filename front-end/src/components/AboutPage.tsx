import { Link } from "react-router-dom";
import "./StyleComponents/AboutPage.css";
import Footer from "./Footer";
import Header from "./Header";

const AboutPage = () => {
  return (
    <>
      <Header className="gameDetail-header" />
      <div className="page-container">
        <main className="about-section">
          <div className="content-container">
            <h1>About Vexta</h1>
            <p>
              <strong>Welcome to Vexta</strong> — your portal to endless gaming
              adventures. Dive into a world of fun and challenges with a diverse
              range of traditional games from around the globe. Whether you're
              looking for strategic board games or engaging outdoor activities,
              Vexta is the place to explore and discover!
            </p>

            <h2>How It Was Made</h2>
            <p>
              Vexta was developed as part of the CMPS 271-Software Engineering
              course at the American University of Beirut (AUB) during the
              Spring 2025 semester. The project was brought to life by a group
              of four computer science students:
            </p>
            <ul>
              <li>
                <strong>Ali Saad</strong>
              </li>
              <li>
                <strong>Tarek Kaadan</strong>
              </li>
              <li>
                <strong>Hussein Marji</strong>
              </li>
              <li>
                <strong>Alfred Nahas</strong>
              </li>
            </ul>

            <p>
              Guided by <strong>Dr. Sari Al Lakkis</strong>, our course
              instructor, we aimed to create a web application that would bring
              together traditional games from different cultures and provide
              users with an engaging platform to explore them. Through this
              project, we sought to blend our passion for technology with our
              appreciation for global cultures and games.
            </p>

            <p>
              We hope that Vexta helps you rediscover the joy of timeless games
              and connects you to cultures worldwide!
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
