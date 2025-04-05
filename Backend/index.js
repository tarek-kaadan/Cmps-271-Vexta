const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./server"); 
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const gamesRoutes = require("./routes/game");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);     
app.use("/api/users", userRoutes);    
app.use("/api/games", gamesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
