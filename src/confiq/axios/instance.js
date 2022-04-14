import axios from 'axios';
import { useSelector } from 'react-redux'
import { store } from "../../../src/redux/store";
// let token = useSelector(state => state.userReducer.token)
let token = "$2y$10$ekdz.jeHgiqPD4t2SfA8xepsqgYfAzi2zQ/2l/85R4vYRVgZB04YG"
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'https://dev.thetechub.us/bolloot/',
});



// 'Authorization' header, etc ...
instance.defaults.headers.common['token'] = token;


//Error Handling
instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  }
);


export default instance;