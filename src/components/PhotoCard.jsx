export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavourite}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-2xl shadow-sm transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-500 ${isFavourite ? 'text-rose-500' : 'text-slate-500'}`}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate text-sm font-semibold text-slate-800" title={photo.author}>{photo.author}</p>
        {isFavourite && <span className="shrink-0 rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">Favourite</span>}
      </div>
    </article>
  );
}
