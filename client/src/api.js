import axios from "axios";
const API = axios.create({ baseURL: "https://top-cat-game-uujg.onrender.com/api/leaderboard" });

export const getTopUsers = (n = 10) => API.get(`/top/${n}`);
