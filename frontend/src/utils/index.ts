import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";
// import axios from "axios";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
}) as typeof Swal;

export const showToast = (icon: SweetAlertIcon, title: string, options?: Partial<SweetAlertOptions>) => {
  Toast.fire({ icon, title, ...options } as SweetAlertOptions);
}

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (error: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// REQUEST INTERCEPTOR — Optional if you need to attach accessToken manually
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If refresh token request itself failed → logout
    const isRefreshTokenRequest = originalRequest.url?.includes("/api/user/refresh-token");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshTokenRequest
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest); // retry the request after refresh
        }).catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await api.post("/api/user/refresh-token"); // should succeed
        processQueue(null); // retry all failed requests
        return api(originalRequest); // retry current one
      } catch (err) {
        processQueue(err, null);
        window.location.href = "/login"; // force logout
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401 && isRefreshTokenRequest) {
      // Refresh token itself failed → force logout
      window.location.href = "/login";
    }

    return Promise.reject(error); // return all other errors
  }
);

export default api;
