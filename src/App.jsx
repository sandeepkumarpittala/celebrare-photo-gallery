import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos.js';
import PhotoCard from './components/PhotoCard.jsx';

const STORAGE_KEY = 'celebrare-photo-gallery-favourites';

function readSavedFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.map(String) : [];
  } catch {
    return [];
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const id = String(action.id);
      return state.includes(id) ? state.filter((savedId) => savedId !== id) : [...state, id];
    }
    default:
      return state;
  }
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, readSavedFavourites);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  // Keep the browser's saved list in sync whenever the reducer state changes.
  // This also preserves the existing list when the app first loads.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Celebrare · Frontend Assignment</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Photo Gallery</h1>
              <p className="mt-2 text-sm text-slate-500">A little inspiration, one photo at a time.</p>
            </div>
            <div className="w-full sm:max-w-sm">
              <label htmlFor="author-search" className="mb-2 block text-sm font-medium text-slate-700">Search by author</label>
              <div className="relative">
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">⌕</span>
                <input
                  id="author-search"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Type an author's name..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="rounded-full bg-violet-50 px-3 py-1.5 font-medium text-violet-700">{photos.length} photos</span>
            <span className="rounded-full bg-rose-50 px-3 py-1.5 font-medium text-rose-600">♥ {favourites.length} favourites</span>
            {searchTerm && <span className="rounded-full bg-slate-100 px-3 py-1.5">{filteredPhotos.length} matching authors</span>}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Photo results">
        {loading && (
          <div role="status" className="flex min-h-64 flex-col items-center justify-center gap-4 text-slate-600">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
            <p className="text-sm font-medium">Loading photos...</p>
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-800">We couldn't load the photos</h2>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <p className="mt-3 text-sm text-red-700">Check your internet connection and refresh the page to try again.</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(String(photo.id))}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-800">No photos found</p>
            <p className="mt-2 text-sm text-slate-500">Try another author name.</p>
          </div>
        )}
      </section>
      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-500">Photos provided by Picsum Photos</footer>
    </main>
  );
}
