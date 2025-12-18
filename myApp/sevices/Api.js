import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.56.1:3001",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default Api;
