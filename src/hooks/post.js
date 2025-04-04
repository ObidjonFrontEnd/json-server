
import { useState } from "react";
import apiClient from '../api/api'


const usePostData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (newData) => {
    setLoading(true);
    try {
      const response = await apiClient.post(url, newData);
      return response.data;
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};

export default usePostData;

