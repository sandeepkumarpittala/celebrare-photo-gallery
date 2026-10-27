import { useEffect, useState } from 'react';

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30';

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(PHOTOS_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Could not load photos (HTTP ${response.status}). Please try again.`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('The photo service returned an unexpected response.');
        }
        setPhotos(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while loading photos.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
