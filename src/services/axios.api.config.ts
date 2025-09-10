import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// axiosPublic.interceptors.response.use(
axios.interceptors.response.use(
  response => response,
  async error => {
    // console.log(' - in Public interceptors: error -> ', error);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // console.log('Public interceptor error?.response in try -> ', error?.response);
        // const resultRefresh = await refresh();
        // console.log('interceptor resultRefresh in try -> ', resultRefresh);
        // console.log('Public interceptor originalRequest in try -> ', originalRequest);
        return await axiosPublic(originalRequest);
      } catch (error) {
        console.error('Public interceptor catch in try error -> ', error);
      }
    }
    return Promise.reject(error);
  }
);

// axiosPrivate.interceptors.response.use(
//   response => response,
//   async error => {
//     // console.log(' - in Private interceptors: error -> ', error);
//     const errorURL = error.config.url;
//     const originalRequest = error.config;
//     // console.log(' -- Private interceptor error.config._retry -> ', error.config._retry, ' - ', !error.config._retry);
//     // NEW 30.08.2025!!! if (error.response?.status === 401 && !originalRequest._retry && errorURL !== '/auth/refresh') {
//          if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // console.log('Private interceptor in try error?.response -> ', error?.response);
//         const resultRefresh = await refresh();
//         // console.log(' ---- Private interceptor resultRefresh -> ', resultRefresh);
//         if (resultRefresh !== 200) {
//           return (window.location.href = "/login");
//         }
//         // console.log(' ----- Private interceptor originalRequest in try -> ', originalRequest);
//         return await axiosPrivate(originalRequest);
//       } catch (error) {
//         console.error('- axios error -> ', error);
//       }
//     }
//     // console.log('NOT if() !!!!!!!-> ');
//     return Promise.reject(error);
//   }
// );