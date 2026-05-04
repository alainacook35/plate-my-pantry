import axios, { AxiosInstance } from 'axios';
import { useMemo } from 'react';

const BASE_URL = 'https://api.spoonacular.com';

const useSpoonacular = (): AxiosInstance => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: BASE_URL,
      params: {
        apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
      },
    });
  }, []);

  return instance;
};

export default useSpoonacular;