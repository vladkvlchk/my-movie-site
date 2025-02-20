import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${
    import.meta.env.VITE_API_READ_ACCESS_TOKEN
  }`;

  return config;
});

export default axiosInstance;
