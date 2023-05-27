import { useState, useEffect } from 'react';

export function useDataFetcher(url: string) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await global.ipcRenderer.invoke('fetch', url);
      setData(result);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error, mutate: fetchData };
}
