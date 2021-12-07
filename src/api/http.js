import axios from "axios";

const DEFAULT_TIMEOUT = 10 * 1000;

const errorHandler = (error) => {
  const { response } = error;
  if (response) return Promise.reject(response);
  // network error handler
  else if (!window.navigator.onLine) console.error("Network error");
};

const $axios = axios.create({
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
});

$axios.interceptors.response.use((res) => res.data, errorHandler);

export { $axios };
