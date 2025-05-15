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

// let isRefreshing = false;
// let failedQueue: Array<{ resolve: any; reject: any }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const isRefreshTokenRequest =
//       originalRequest.url?.includes("/api/user/refresh-token");

//     console.log("[AXIOS] Error on:", originalRequest.url, "Status:", error.response?.status, "isRefreshTokenRequest:", isRefreshTokenRequest, "Retry:", originalRequest._retry);

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !isRefreshTokenRequest
//     ) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => api(originalRequest));
//       }

//       isRefreshing = true;

//       try {
//         await api.post("/api/user/refresh-token");
//         processQueue(null);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         window.location.href = "/login";
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     if (
//       error.response?.status === 401 &&
//       isRefreshTokenRequest
//     ) {
//       window.location.href = "/login";
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );

export default api;