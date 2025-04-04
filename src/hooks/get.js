import { useState, useEffect } from "react";
import apiClient from '../api/api'


const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.get( `${url}`);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();   
  }, [url]);


  return { data, loading, refech:fetchData , error};
};

export default useGetData;
