import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FriendSearch.css"; // ✅ Import the CSS

interface User {
  _id: string;
  email: string;
}

const FriendSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleAddFriend = async (friendId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("You must be logged in to add friends.");
        return;
      }
  
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/add-friend`, {
        friendId: friendId,
      });
  
      console.log("Friend added:", response.data);
  
      // ✅ Update local state to disable the button or show a success message
      setFriends((prev) => [...prev, friendId]);
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };  

  return (
    <div className="friend-search-page">
      <h2 className="friend-search-heading">🎮 Find and Add Friends</h2>
      <div className="center-button">
        <button
        className="view-friends-button"
        onClick={() => (window.location.href = "/my-friends")}
        >
        👥 View My Friends
        </button>
    </div>

      <div className="friend-list">
        {users
          .filter((u) => u._id !== currentUserId)
          .map((user) => (
            <div key={user._id} className="friend-card">
              <span className="friend-email">{user.email}</span>
              {!friends.includes(user._id) ? (
                <button className="add-button" onClick={() => handleAddFriend(user._id)}>
                ➕ Add Friend
                </button>
              ) : (
                <span className="friend-added">✅ Friend Added</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendSearch;
