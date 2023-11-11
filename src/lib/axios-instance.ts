import { API_URL } from "../constants/constants";
import _axios from "axios";

const axios = _axios.create({
  baseURL: API_URL, // Your API base URL
});

export default axios;
