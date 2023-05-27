import { useState, useEffect } from 'react';

export function useDataFetcher() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await global.ipcRenderer.invoke('fetch');
      setData(result);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, mutate: fetchData };
}
