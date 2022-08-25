
import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const axiosAuthorize = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
});