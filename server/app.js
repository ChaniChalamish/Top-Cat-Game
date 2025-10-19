// server/app.js
import express from "express";
import cors from "cors";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { initDb } from "./db/connect.js";
import { seedUsers } from "./db/seed.js";


const app = express();

app.use(express.json());

app.use(cors());

await initDb();
await seedUsers();

// Routes
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
