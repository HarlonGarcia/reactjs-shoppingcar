import axios from "axios";

export const api = axios.create({
  baseURL: `https://${import.meta.env.VITE_API_URL}`,
});
