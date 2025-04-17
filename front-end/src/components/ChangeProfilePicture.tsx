import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangeProfilePicture: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Live preview
    }
  };

  const handleUpload = async () => {
    if (!image || !userId) {
      setMessage("Missing image or user ID.");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePicture", image);
  
    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/${userId}/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      localStorage.setItem("profilePicture", res.data.user.profilePicture);
      setMessage("✅ Profile picture updated!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Failed to upload.");
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🖼️ Change Profile Picture</h2>
        {preview && (
          <img
            src={`http://localhost:5000/${preview}`}
            alt="Preview"
            style={{ width: 100, height: 100, borderRadius: "50%", marginBottom: 10 }}
          />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginTop: "15px" }}>
          Upload
        </button>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
