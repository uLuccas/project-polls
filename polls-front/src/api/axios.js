import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
//   baseURL: process.env.API_BASE_URL,
  baseURL:"http://localhost:3080/api/polls",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
