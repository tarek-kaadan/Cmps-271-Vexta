import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './PinEntry.css';

export default function PinEntry() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "0000") {
      navigate("/add-game");
    } else {
      setError("❌ Incorrect PIN. Please try again.");
    }
  };

  return (
    <div className="pin-entry-container">
      <h2>Enter PIN to Access Add Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <div style={{marginBottom: "500px"}}></div>
    </div>
  );
}
