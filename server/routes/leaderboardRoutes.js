import express from "express";
import { pool } from "../db/connect.js";
const router = express.Router();

// ➕ Add user
router.post("/add", async (req, res) => {
    try {
        const { name, image, score } = req.body;

        if (!name || score === undefined) {
            return res.status(400).json({ error: "Missing name or score" });
        }

        await pool.none(
            "INSERT INTO users(name, image, score) VALUES($1, $2, $3)",
            [name, image, score]
        );

        res.json({ message: "User added", user: { name, image, score } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// 🔼 Update score
router.put("/update/:id", async (req, res) => {
    try {
        const { score } = req.body;
        const result = await pool.query(
            "UPDATE users SET score = $1 WHERE id = $2 RETURNING *",
            [score, req.params.id]
        );
        res.json({ message: "Score updated", user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📋 Get all users
router.get("/", async (req, res) => {
    try {
        console.log("Fetching all users from the database");
        const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🏆 Get top N users
router.get("/top/:n", async (req, res) => {
    try {
        const n = parseInt(req.params.n);
        const result = await pool.query(
            "SELECT * FROM users ORDER BY score DESC LIMIT $1",
            [n]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 👤 Get user rank and neighbors
router.get("/rank/:id", async (req, res) => {
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        const user = userResult.rows[0];
        if (!user) return res.status(404).json({ error: "User not found" });

        const rankResult = await pool.query(
            "SELECT COUNT(*) + 1 AS rank FROM users WHERE score > $1",
            [user.score]
        );
        const rank = parseInt(rankResult.rows[0].rank);

        const neighbors = await pool.query(
            "SELECT * FROM users ORDER BY score DESC OFFSET GREATEST($1 - 6, 0) LIMIT 11",
            [rank]
        );

        res.json({ user, rank, neighbors: neighbors.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
