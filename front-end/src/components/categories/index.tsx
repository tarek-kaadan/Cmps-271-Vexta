import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  'Board Game',
  'Physical Game',
  'Team Sport',
  'Horseback Sport',
  'Outdoor Game',
  'Hand Game',
  'Throwing Game',
  'Toy Game',
  'Dexterity Game',
  'Strength Game',
  'Coordination Game',
  'Jumping Game',
  'Circle Game',
  'Elimination Game',
  'Collectible Game',
];

const ChooseCategories: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category],
    );
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await axios.post('http://localhost:5001/api/users/preferences', {
        userId,
        categories: selectedCategories,
      });
      navigate('/');
    } catch (error) {
      console.error('Error saving preferences', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1e1e1e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(84, 84, 84, 0.8)',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 600 }}>
          Select Your Favorite Categories
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          {categories.map((cat) => (
            <label
              key={cat}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: selectedCategories.includes(cat)
                  ? 'rgba(0, 255, 150, 0.1)'
                  : 'rgba(255, 255, 255, 0.05)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                fontWeight: selectedCategories.includes(cat) ? 600 : 400,
              }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                style={{
                  marginRight: '0.5rem',
                  transform: 'scale(1.2)',
                  cursor: 'pointer',
                }}
              />
              {cat}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default ChooseCategories;
