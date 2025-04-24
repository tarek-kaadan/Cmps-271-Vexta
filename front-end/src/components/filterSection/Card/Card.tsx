import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
interface Props {
  _id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
}

export default function Card({ title, description, image, rating, _id }: Props) {
  
  const [bookmarked, setBookmarked] = useState(false);
  const userId = localStorage.getItem("userId");

  // Check if this game is already bookmarked
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${API_BASE_URL}/api/users/${userId}/bookmarks`)
      .then((res) => {
        const isBookmarked = res.data.some((game: any) => game._id === _id);
        setBookmarked(isBookmarked);
      })
      .catch((err) => console.error("Failed to check bookmarks:", err));
  }, [userId, _id]);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation
    try {
      await axios.post(`${API_BASE_URL}/api/users/${userId}/bookmark`, {
        gameId: _id,
      });
      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  return (
    <Link
    className='card'
      to={`/games/title/${title}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: "white",
        border: '1px solid hsl(0, 0%, 80%)',
        width: '300px',
        height: '300px',
        boxShadow: '5px 5px 5px hsla(0, 0%, 0%, 0.056)',
        borderRadius: '10px',
        transition: 'transform 0.3s ease-in-out',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
      onClick={toggleBookmark}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 2,
        fontSize: '18px',
        transition: 'transform 0.2s ease',
      }}
      title={bookmarked ? "Remove Bookmark" : "Bookmark"}
    >
      <span style={{ color: bookmarked ? 'red' : 'gray' }}>
        {bookmarked ? '❤️' : '🤍'}
      </span>
    </button>
      <img
        src={image}
        alt="Game Picture"
        style={{
          height: '150px',
          width: '100%',
          borderRadius: '9px 9px 0px 0px',
          display: 'block',
          objectFit: 'cover',
        }}
      />
      <h2
        style={{
          paddingLeft: '10px',
          paddingTop: '10px',
          fontSize: '150%',
          fontFamily: '"Poppins", "sans-serif"',
          fontWeight: 500,
          fontStyle: "bold",
          textAlign: 'left',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          position: 'absolute',
          top: '160px',
          right: '10px',
          height: '30px',
          width: '75px',
          border: '1.5px solid hsl(0, 0%, 80%)',
          boxShadow: '2px 2px 2px hsla(0, 0%, 0%, 0.056)',
          borderRadius: '9px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: '"Poppins", "sans-serif"',
            fontWeight: 500,
            fontStyle: "bold",
            fontSize: '13px',
            lineHeight: '1',
            paddingRight: '10px'
          }}
        >
          ⭐ {rating}
        </p>
      </div>

      <p
        style={{
          paddingLeft: '10px',
          paddingRight: '10px',
          textAlign: 'left',
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: '15px',
        }}
      >
        {description}
      </p>
    </Link>
  );
}
