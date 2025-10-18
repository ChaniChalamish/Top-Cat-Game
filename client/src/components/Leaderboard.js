// client/src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import { getTopUsers } from "../api";
import "../App.css"; // כל הסטיילינג בקובץ CSS

export default function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getTopUsers(10)
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    if (!Array.isArray(users) || users.length === 0) {
        return <p className="no-users">No users yet</p>;
    }

    const top3 = users.slice(0, 3);
    const rest = users.slice(3);

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">🏆 Leaderboard</h2>

            {/* Top 3 */}
            <div className="top3-container">
                {top3.map((u, i) => (
                    <div key={u.id} className={`top-user top-user-${i + 1}`}>
                        <div className={`top-user-image top-user-image-${i + 1}`}>
                            <img
                                src={u.image || "https://via.placeholder.com/80"}
                                alt={u.name}
                            />
                        </div>
                        <div className="top-user-name">{u.name}</div>
                        <div className="top-user-score">{u.score} pts</div>
                    </div>
                ))}
            </div>

            {/* Rest of the users */}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {rest.map((u, i) => (
                        <tr key={u.id} className="user-row">
                            <td>{i + 4}</td>
                            <td>
                                <img
                                    src={u.image || "https://via.placeholder.com/40"}
                                    alt={u.name}
                                    className="user-image"
                                />
                            </td>
                            <td>{u.name}</td>
                            <td>{u.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
