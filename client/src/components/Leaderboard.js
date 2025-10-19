import React, { useEffect, useState } from "react";
import "../App.css";
import getTopUsers from "../api";


const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
getTopUsers(10)
    .then((res) => res.json())
            .then((data) => {
                setPlayers(data || []);
                setRewards(data.score || []);
            })
            .catch((err) => console.error("Error loading leaderboard:", err));
    }, []);

    const topThree = players.slice(0, 3);
    const others = players.slice(3);

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">🏆 Top Cats!</h2>

            <div className="leaderboard-rewards">
                {rewards.map((r, i) => (
                    <div
                        key={i}
                        className={`reward-box ${i === 0 ? "bronze" : i === 1 ? "silver" : "gold"
                            }`}
                    >
                        <h4>{r.title}</h4>
                        <p>💎 {r.gems}</p>
                        <p>🪙 {r.coins}</p>
                    </div>
                ))}
            </div>

            <div className="top-three">
                {topThree.map((p, index) => (
                    <div
                        key={p.id || index}
                        className={`top-player ${index === 0
                                ? "first"
                                : index === 1
                                    ? "second"
                                    : "third"
                            }`}
                    >
                        <div className="crown">
                            {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                        </div>
                        <img src={p.image} alt={p.name} className="top-img" />
                        <div className="top-name">{p.name}</div>
                        <div className="top-score">💎 {p.score}</div>
                    </div>
                ))}
            </div>

            {/* Rest of the leaderboard */}
            <div className="leaderboard-list">
                <div className="leaderboard-header">
                    <span>#</span>
                    <span>Player</span>
                    <span>Score</span>
                </div>

                {others.map((p, index) => (
                    <div key={p.id || index} className="leaderboard-item">
                        <span className="rank">{index + 4}</span>
                        <div className="player-info">
                            <img src={p.image} alt={p.name} className="player-img" />
                            <span className="player-name">{p.name}</span>
                        </div>
                        <span className="player-score">💎 {p.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
