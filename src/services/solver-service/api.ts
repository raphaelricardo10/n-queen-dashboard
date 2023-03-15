import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_SOLVER_API_URL ?? "http://127.0.0.1:3001",
  timeout: Number.parseInt(process.env.REACT_APP_API_TIMEOUT ?? "1000"),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=utf-8",
  },
});
