import { useState } from "react";
import axios from "axios";
import './AddGame.css';

export default function AddGame() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    originCountry: "",      
    numberOfPlayers: "",
    culture: "",
    averageRating: "",
    ageGroup: "",
    estimatedDuration: "",
    culturalContext: "",
    fullDescription: "",
    overlayImage: "",
    sliderImage: "",
    video: "",
    Embedded: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      ...formData,
      averageRating: parseFloat(formData.averageRating),
      numberOfPlayers: parseInt(formData.numberOfPlayers),
      OriginCountry: formData.originCountry,
      Video: formData.video
    };
  
    delete (payload as any).originCountry;
    delete (payload as any).video;
  
    try {
      await axios.post("http://localhost:5001/api/games", payload);
      alert("Game submitted successfully!");
    } catch (err) {
      console.error("Failed to submit game:", err);
      alert("Error submitting game.");
    }
  };

  return (
    <div className="add-game-container">
      <h2>Add a New Game</h2>
      <form className="add-game-form" onSubmit={handleSubmit}>
        {[
            "title", "description", "category", "originCountry", "numberOfPlayers", 
            "culture", "averageRating", "ageGroup", "estimatedDuration", 
            "culturalContext", "fullDescription", "overlayImage", "sliderImage", "video", "Embedded"
        ].map((field) => (
            <div key={field}>
            {["description", "fullDescription", "culturalContext"].includes(field) ? (
                <textarea
                name={field}
                placeholder={`${field}${["sliderImage", "video", "Embedded"].includes(field) ? " (optional)" : ""}`}
                value={(formData as any)[field]}
                onChange={handleChange}
                />
            ) : (
                <input
                type="text"
                name={field}
                placeholder={`${field}${["sliderImage", "video", "Embedded"].includes(field) ? " (optional)" : ""}`}
                value={(formData as any)[field]}
                onChange={handleChange}
                />
            )}
            </div>
        ))}
        <button type="submit">Submit Game</button>
    </form>
    </div>
  );
}
