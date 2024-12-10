import axios, { type AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFetch = <T,>(
  url: string
): [T | null, boolean, AxiosError | null] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  // make request
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await axios.get<T>(url);

        setData(response?.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError?.message || "Something went wrong");
        setError(axiosError);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return [data, isLoading, error];
};
