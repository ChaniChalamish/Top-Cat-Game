import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/leaderboard" });

export const getTopUsers = (n = 10) => API.get(`/top/${n}`);
