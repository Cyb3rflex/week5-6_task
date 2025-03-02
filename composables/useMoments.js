import { useApi } from "./useApi";

export const useMoments = () => {
  const { fetchData } = useApi();

  const getAllMoments = async () => {
    return await fetchData("/moment");
  };

  const getMomentById = async (id) => {
    return await fetchData(`/moment/${id}`);
  };

  const createMoment = async (title, details, futureDate) => {
    return await fetchData("/moment", "POST", { title, details, futureDate });
  };

  return { getAllMoments, getMomentById, createMoment };
};
