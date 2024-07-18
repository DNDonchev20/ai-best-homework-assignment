import axios from "axios";

const apiUrl = "https://homework-server.azurewebsites.net";

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
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
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
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (refreshToken) {
          // Assuming refreshTokenClient is defined elsewhere
          const response = await refreshTokenClient.post("/auth/refresh", {
            refreshToken,
          });
          if (response.data.access_token && response.data.refresh_token) {
            sessionStorage.setItem("accessToken", response.data.access_token);
            sessionStorage.setItem("refreshToken", response.data.refresh_token);
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${response.data.access_token}`;
            originalRequest.headers["Authorization"] =
              `Bearer ${response.data.access_token}`;
            return axios(originalRequest);
          }
        }
      } catch (refreshError) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
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
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (refreshToken) {
          // Assuming refreshTokenClient is defined elsewhere
          const response = await refreshTokenClient.post("/auth/refresh", {
            refreshToken,
          });
          if (response.data.access_token && response.data.refresh_token) {
            sessionStorage.setItem("accessToken", response.data.access_token);
            sessionStorage.setItem("refreshToken", response.data.refresh_token);
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${response.data.access_token}`;
            originalRequest.headers["Authorization"] =
              `Bearer ${response.data.access_token}`;
            return axios(originalRequest);
          }
        }
      } catch (refreshError) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
