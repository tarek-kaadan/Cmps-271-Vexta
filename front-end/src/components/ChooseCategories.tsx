import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChooseCategories.css"; // Make sure to create and import this CSS file

const categories = [
  "Board Game", "Physical Game", "Team Sport", "Horseback Sport",
  "Outdoor Game", "Hand Game", "Throwing Game", "Toy Game",
  "Dexterity Game", "Strength Game", "Coordination Game", "Jumping Game",
  "Circle Game", "Elimination Game", "Collectible Game"
];

const ChooseCategories: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await axios.post("http://localhost:5000/api/users/preferences", {
        userId,
        categories: selectedCategories,
      });
      navigate("/"); // Or "/recommendations"
    } catch (error) {
      console.error("Error saving preferences", error);
    }
  };

  return (
    <div className="category-container">
      <h2>Select Your Favorite Categories</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <label key={cat} className="category-item">
            <input
            style={{
                fontWeight: selectedCategories.includes(cat) ? "bold" : "normal",
              }}
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryToggle(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Save Preferences
      </button>
    </div>
  );
};

export default ChooseCategories;
