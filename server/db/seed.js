import { pool } from "./connect.js";

const users = [
    { name: "Noa", image: "https://i.pravatar.cc/100", score: 1500 },
    { name: "Ruti", image: "https://i.pravatar.cc/101", score: 2000 },
    { name: "Eden", image: "https://i.pravatar.cc/102", score: 1200 },
    { name: "Lior", image: "https://i.pravatar.cc/103", score: 1800 },
    { name: "Tamar", image: "https://i.pravatar.cc/104", score: 1700 },
    { name: "Amit", image: "https://i.pravatar.cc/105", score: 1600 },
    { name: "Yael", image: "https://i.pravatar.cc/106", score: 1900 },
    { name: "Ori", image: "https://i.pravatar.cc/107", score: 1550 },
    { name: "Noam", image: "https://i.pravatar.cc/108", score: 1450 },
    { name: "Shira", image: "https://i.pravatar.cc/109", score: 1350 },
    { name: "Eli", image: "https://i.pravatar.cc/110", score: 1250 },
    { name: "Maya", image: "https://i.pravatar.cc/111", score: 1150 },
    { name: "Daniel", image: "https://i.pravatar.cc/112", score: 1050 },
    { name: "Hila", image: "https://i.pravatar.cc/113", score: 950 },
    { name: "Itay", image: "https://i.pravatar.cc/114", score: 850 },
];

export async function seedUsers() {
    if (!pool) {
        console.error(" Pool not initialized. Call initDb() first!");
        return;
    }

    for (const user of users) {
        try {
            await pool.query(
                "INSERT INTO users (name, image, score) VALUES ($1, $2, $3)",
                [user.name, user.image, user.score]
            );
            console.log(` Added user: ${user.name}`);
        } catch (err) {
            console.error(` Error adding user ${user.name}:`, err.message);
        }
    }

    console.log(" All users added!");
}
