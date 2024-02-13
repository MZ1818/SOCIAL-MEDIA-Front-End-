import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "../redux/store";
import { showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

//request interceptor is a membrane b/w any request made by frontEnd toward backEnd ,, this interceptoR will take the AUTHORIZATION TOKEN from FE for BE
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

//response interceptor checks any response made by backend towards frontend
axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;

    //if status is ok we will show all required data
    if (data.status === "ok") {
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );

    //when statuscode is 401 on refreshing token even(means refresh token has expired & user need to be login again)
    // if (
    //   statusCode === 401 &&
    //   originalRequest.url ===
    //     `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
    // ) {
    //   removeItem(KEY_ACCESS_TOKEN);
    //   window.location.replace("/login", "_self");
    //   return Promise.reject(error);
    // }

    //if statuscode is 401 on other links mean(accessToken has expired) so we will hit refreshToken
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

      //we will replace accessToken with new one
      if (response.data.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;

        return axios(originalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error.message,
      })
    );
    return Promise.reject(error);
  }
);
