import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FriendSearch.css"; // ✅ Reuse styles

interface Friend {
  _id: string;
  email: string;
}

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/friends`);
        setFriends(response.data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div className="friend-search-page">
      <h2 className="friend-search-heading">👥 Your Friends</h2>

      {friends.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>You haven’t added any friends yet.</p>
      ) : (
        <div className="friend-list">
          {friends.map((friend) => (
            <div key={friend._id} className="friend-card">
              <span className="friend-email">{friend.email}</span>
              <span className="friend-added">✅ Connected</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
