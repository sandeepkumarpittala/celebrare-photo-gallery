# Celebrare Photo Gallery Assignment

React + Vite + Tailwind CSS implementation of the seven requirements in the Celebrare pre-screening PDF.

## Run locally

1. Install Node.js (LTS) if it is not already installed.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed in the terminal.
5. Run `npm run build` to verify a production build.

## Assignment requirements covered

- Fetches 30 items from `https://picsum.photos/v2/list?limit=30` via `src/hooks/useFetchPhotos.js`.
- Loading and error states.
- Responsive Tailwind grid: one column on mobile, two on tablet, four on desktop.
- Live author-name search filters the already-fetched array.
- Favourites managed with `useReducer` and persisted to `localStorage`.
- `useCallback` for the search handler; `useMemo` for the filtered list.

## Before submitting

- Run it locally and test search, favourites and persistence after refresh.
- Run `npm run build` and fix any errors.
- Push the project to a **public** GitHub repository.
- Record the required five-minute explanation. Only describe code you understand.
- Submit the GitHub and recording links through the Google Form from the message.
