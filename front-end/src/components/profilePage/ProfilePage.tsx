import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../filterSection/Card/Card";
import './ProfilePage.css';
import { API_BASE_URL } from '../../config'; 
interface Game {
  _id: string;
  title: string;
  description: string;
  overlayImage: string;
  averageRating: number;
}

export default function ProfilePage() {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [bookmarks, setBookmarks] = useState<Game[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/users/${userId}/profile`)
      .then(res => {
        setUsername(res.data.username);
        setBookmarks(res.data.bookmarks);
      })
      .catch(err => console.error("Failed to load profile:", err));
  }, [userId]);

  return (
    <div className="profile-container">
      <h1 className="profile-header">{username}'s Profile</h1>
      <h2 className="bookmark-title">Bookmarked Games</h2>
      {bookmarks.length === 0 ? (
        <p className="no-bookmarks">No bookmarks yet.</p>
      ) : (
        <div className="bookmark-grid">
          {bookmarks.map(game => (
            <Card
              key={game._id}
              _id={game._id}
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
