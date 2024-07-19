import axios from "axios";

const apiUrl = "http://localhost:3000/";

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshTokenClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const isLogged = sessionStorage.getItem("isLogged");
        if (isLogged === "true") {
          const refreshToken = sessionStorage.getItem("refresh_token");
          if (refreshToken) {
            const response = await refreshTokenClient.post("/auth/refresh", {
              refreshToken,
            });
            if (response.data.access_token && response.data.refresh_token) {
              sessionStorage.setItem("access_token", response.data.access_token);
              sessionStorage.setItem("refresh_token", response.data.refresh_token);
              axios.defaults.headers.common["Authorization"] =
                `Bearer ${response.data.access_token}`;
              originalRequest.headers["Authorization"] =
                `Bearer ${response.data.access_token}`;
              return axios(originalRequest);
            }
          }
        }
      } catch (refreshError) {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
