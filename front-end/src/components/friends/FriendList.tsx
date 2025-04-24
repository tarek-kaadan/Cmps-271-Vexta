import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FriendList.css';
import { API_BASE_URL } from '../../config'; 

interface User {
  _id: string;
  email: string;
  username: string;
}

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!currentUserId) return;
        const response = await axios.get(
          `${API_BASE_URL}/api/users/${currentUserId}/friends`,
        );
        setFriends(response.data);
      } catch (err) {
        console.error('Error fetching friends:', err);
      }
    };

    fetchFriends();
  }, [currentUserId]);

  const handleRemoveFriend = async (friendId: string) => {
    try {
      if (!currentUserId) {
        alert('You must be logged in to remove friends.');
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/users/${currentUserId}/remove-friend`,
        {
          friendId,
        },
      );

      console.log('Friend removed:', response.data);

      // Update local list
      setFriends((prev) => prev.filter((f) => f._id !== friendId));
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };

  return (
    <div className="friend-list-page">
      <h2 className="friend-list-heading">👥 Your Friends</h2>
      <div className="friend-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} className="friend-card">
              <Link to={`/profile/${friend._id}`} className="friend-email">
                {friend.username}
              </Link>
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
