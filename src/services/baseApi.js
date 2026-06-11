import axios from "axios";
import { getAuth } from "firebase/auth";
//
// /* Create axios instance */
const api = axios.create({
    // baseURL: "http://localhost:5050",
    baseURL: "https://ashok-enterprises-api.vercel.app",
    headers: {
        "Content-Type": "application/json",
        "X-Application-Type": "React" // Added for php api to identify requesting application
    }
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();

    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Passes response.data to services.
 * In dev, intercepts response and logs it into console for dev
 */
api.interceptors.response.use((response) => {
    let validResponse = response;
    return validResponse;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

export default api;
