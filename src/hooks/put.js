
import { useState } from "react";
import apiClient from '../api/api'


const useUpdateData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`${url}/${id}`, updatedData);
      return response.data;
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
};

export default useUpdateData;

