const { default: chalk } = require("chalk")
const express = require("express")
const app = express()

app.get("/game.api", (req, res) =>{
    res.json(gameCards =
          {
            id: 1,
            title: "Cyberpunk 2077",
            imageUrl: "https://example.com/cyberpunk2077.jpg",
            description: "Futuristic RPG set in Night City.",
            rating: 4.5
          },
          {
            id: 2,
            title: "The Witcher 3",
            imageUrl: "https://example.com/witcher3.jpg",
            description: "Fantasy RPG about Geralt of Rivia.",
            rating: 4.9
          }
    )
})

app.listen(5000, () => {console.log("server started at port 5000")})