import { useApi } from "./useApi";

export const useAuth = () => {
  const { fetchData } = useApi();
  const token = useCookie("token");

  const login = async (email, password) => {
    const data = await fetchData("/users/login", "POST", { email, password });
    if (data?.token) token.value = data.token;
    return data;
  };

  const signup = async (fullname, email, password) => {
    return await fetchData("/users/signup", "POST", {
      fullname,
      email,
      password,
    });
  };

  const fetchProfile = async () => {
    return await fetchData("/users/me");
  };

  return { login, signup, fetchProfile };
};
