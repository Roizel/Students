import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44315/",
  //baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
});