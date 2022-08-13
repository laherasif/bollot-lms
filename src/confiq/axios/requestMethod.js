import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

let user 
if (typeof window !== 'undefined') {
     user =  JSON.parse(window.localStorage.getItem("persist:root"))?.userReducer;
    }
    const TOKEN = user && JSON.parse(user).token;



export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: TOKEN,
});
