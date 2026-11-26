# 🎮 Vexta

**Your portal to endless gaming adventures.** Vexta is a game discovery platform where users sign up, browse a game catalog and get personalized recommendations.

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)

## Features

- 🔑 **Accounts**: sign up and log in, with passwords hashed using bcrypt
- 🕹️ **Game catalog**: browse popular games as cards
- ✨ **Recommendations**: personalized game suggestions
- 🗺️ **Maps** with Leaflet, plus file uploads with Multer

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React, React Router, Bootstrap, React Icons, Leaflet |
| Backend | Node.js, Express, Mongoose, Multer, bcryptjs |
| Database | MongoDB |

## Project structure

```
├── src/          # React frontend (pages, components)
├── Backend/      # Express API (routes, controllers, models, middlewares)
└── public/       # Static assets
```

## Getting started

```bash
# frontend
npm install
npm start            # http://localhost:3000

# backend
cd Backend
npm install
node server.js
```

Create `Backend/.env` with your MongoDB connection string before starting the API.

## Team

Built for CMPS 271 by [Tarek Kaadan](https://github.com/tarek-kaadan) and teammates.
