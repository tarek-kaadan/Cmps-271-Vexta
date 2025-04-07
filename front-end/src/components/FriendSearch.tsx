import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FriendSearch.css";

interface User {
  _id: string;
  email: string;
  username: string;
}

const FriendSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<Set<string>>(new Set());
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsersAndFriends = async () => {
      try {
        if (!currentUserId) return;

        // 1. Get all users
        const usersResponse = await axios.get("http://localhost:5000/api/users");
        const uniqueUsers = Array.from(
          new Map(usersResponse.data.map((u: User) => [u._id, u])).values()
        ) as User[];        
        setUsers(uniqueUsers);

        // 2. Get current user's friends
        const friendsResponse = await axios.get(`http://localhost:5000/api/users/${currentUserId}/friends`);
        const friendIds = friendsResponse.data.map((f: User) => f._id);
        setFriends(new Set(friendIds));
      } catch (err) {
        console.error("Error fetching users or friends:", err);
      }
    };

    fetchUsersAndFriends();
  }, [currentUserId]);

  const handleAddFriend = async (friendId: string) => {
    try {
      if (!currentUserId) {
        alert("You must be logged in to add friends.");
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/users/${currentUserId}/add-friend`, {
        friendId,
      });

      console.log("Friend added:", response.data);

      setFriends(prev => new Set(prev).add(friendId));
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

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

      setFriends(prev => {
        const updated = new Set(prev);
        updated.delete(friendId);
        return updated;
      });
    } catch (err) {
      console.error("Error removing friend:", err);
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
              <span className="friend-email">{user.username}</span>
              {!friends.has(user._id) ? (
                <button className="add-button" onClick={() => handleAddFriend(user._id)}>
                  ➕ Add Friend
                </button>
              ) : (
                <button className="remove-button" onClick={() => handleRemoveFriend(user._id)}>
                  ❌ Remove Friend
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendSearch;
