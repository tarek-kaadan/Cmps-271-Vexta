import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FriendList.css";

interface User {
  _id: string;
  email: string;
  username: string;
}

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!currentUserId) return;
        const response = await axios.get(`http://localhost:5000/api/users/${currentUserId}/friends`);
        setFriends(response.data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };

    fetchFriends();
  }, [currentUserId]);

  const handleRemoveFriend = async (friendId: string) => {
    try {
      if (!currentUserId) {
        alert("You must be logged in to remove friends.");
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/users/${currentUserId}/remove-friend`, {
        friendId,
      });

      console.log("Friend removed:", response.data);

      // Update local list
      setFriends((prev) => prev.filter((f) => f._id !== friendId));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  return (
    <div className="friend-list-page">
      <h2 className="friend-list-heading">👥 Your Friends</h2>
      <div className="friend-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} className="friend-card">
              <span className="friend-email">{friend.username}</span>
              <button className="remove-button" onClick={() => handleRemoveFriend(friend._id)}>
                ❌ Remove Friend
              </button>
            </div>
          ))
        ) : (
          <p className="no-friends-msg">You have no friends yet.</p>
        )}
      </div>
    </div>
  );
};

export default FriendList;
