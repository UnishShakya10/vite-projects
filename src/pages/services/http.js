import axios from "axios";

export const APIURL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export function GetRequest(url) {
  return axios.get(`${APIURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function PostRequest(url, body) {
  return axios.post(`${APIURL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}