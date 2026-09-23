import axios from "axios";

export const APIURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken") || localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export function GetRequest(url) {
  return axios.get(`${APIURL}/${url}`, {
    headers: getAuthHeaders(),
  });
}

export function PostRequest(url, body) {
  return axios.post(`${APIURL}/${url}`, body, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
}