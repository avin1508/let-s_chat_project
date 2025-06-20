import axios from "axios";
import Toast from "react-native-toast-message";
import { logOutUser } from "../reduxToolkit/slices/authSlice";
import { BASE_URL } from "../Constants/apiBase";

let storeRef; // 🔁 Global reference for store

// ✅ Inject store from AppWrapper
export const injectStore = (_store) => {
  storeRef = _store;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const userInfo = storeRef?.getState()?.auth?.user?.data;
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Toast.show({
        type: "error",
        text1: "Session Expired",
        text2: "Please login again",
      });
      storeRef?.dispatch(logOutUser());
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
