const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  preferences: { type: [String], default: [] },
  profilePicture: {
    type: String, default: "uploads/default.jpg",}
});

module.exports = mongoose.model("User", UserSchema);
