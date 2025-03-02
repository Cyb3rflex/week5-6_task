import { useFetch } from "#app";
import { useCookie } from "#app";

const API_BASE_URL = "https://eventful-moments-api.onrender.com/api/v1";

export const useApi = () => {
  const token = useCookie("token");
  const user = useCookie("user"); // Store user details

  const fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value || ""}`,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const { data, error } = await useFetch(
        `${API_BASE_URL}${endpoint}`,
        options
      );
      if (error.value) throw new Error(error.value);

      return data.value;
    } catch (err) {
      console.error("API Error:", err.message);
      throw err;
    }
  };

  return { fetchData, token, user };
};
