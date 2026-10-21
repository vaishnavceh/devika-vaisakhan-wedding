import { useState, useEffect } from 'react';
import { WeddingData, initialWeddingData } from '../data/weddingData';

export function useWeddingData() {
  const [data, setData] = useState<WeddingData>(initialWeddingData);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveFromApi, setIsLiveFromApi] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const apiUrl = `${apiBase}/api/wedding`;

    async function fetchData() {
      try {
        const response = await fetch(apiUrl, {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const json = await response.json();
        if (json?.status === 'success' && json?.data && isMounted) {
          setData(json.data);
          setIsLiveFromApi(true);
        }
      } catch (_err) {
        // Graceful fallback to initial bundled static data
        if (isMounted) {
          setIsLiveFromApi(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, isLiveFromApi };
}
