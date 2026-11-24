# Cine-Stream

A Netflix-lite movie discovery single page app built with **React (Vite)** and the **TMDB API**. It shows popular movies in a responsive grid, lets you search with a debounced input, loads more movies as you scroll, and keeps your favorites saved in the browser.

**Live Demo:** https://cine-stream-drab-three.vercel.app/


## Features

- **Popular movies grid:** poster, title, release year and rating for each movie, in a responsive CSS Grid
- **Search:** results come from the TMDB search endpoint
- **Debounced search:** the API is called only after the user stops typing for 500ms, so typing "batman" sends 1 request instead of 6
- **Infinite scroll:** an `IntersectionObserver` watches a sentinel element at the bottom of the grid and fetches page N+1 automatically, appending to the existing list
- **Favorites:** heart button on every card, saved in `localStorage`, shown on a dedicated `/favorites` route, and kept after a page reload
- **Lazy-loaded images:** every poster uses native `loading="lazy"`
- **Graceful fallbacks:** a placeholder is shown when a movie has no poster, plus loading, error and empty states
- **Responsive:** works from small phones to desktops

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React (Vite) | UI |
| React Router | `/` and `/favorites` routes |
| TMDB API | Movie data |
| Context API | Shared favorites state |
| localStorage | Favorites persistence |
| IntersectionObserver | Infinite scroll |
| Vercel | Deployment |

## Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/cine-stream.git
cd cine-stream
npm install
```

Create a `.env.local` file in the project root:

```
VITE_TMDB_KEY=your_tmdb_api_key
```

Then start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`.

> Get a free API key from [developer.themoviedb.org](https://developer.themoviedb.org). `.env.local` is git-ignored so the key is never committed. On Vercel, add `VITE_TMDB_KEY` under Environment Variables and redeploy.

## Project Structure

```
src/
├── api/
│   └── tmdb.js              # All TMDB requests
├── components/
│   ├── MovieCard.jsx        # Poster, info, heart button
│   ├── MovieGrid.jsx
│   ├── Navbar.jsx
│   └── SearchBar.jsx
├── context/
│   └── FavoritesContext.jsx # Favorites state synced with localStorage
├── hooks/
│   └── useDebounce.js       # 500ms debounce hook
├── pages/
│   ├── Home.jsx             # Popular, search, infinite scroll
│   └── Favorites.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## How It Works

- **Debounce:** `useDebounce` delays updating the search query until the user has stopped typing for 500ms. A cleanup function cancels the previous timer on every keystroke.
- **Infinite scroll:** when the sentinel enters the viewport, the page number increases and the next page is appended with `[...prev, ...new]`. Duplicates (TMDB can repeat items across pages) are filtered by movie id so React keys stay unique.
- **Favorites:** the context initialises from `localStorage` and writes back on every change, so favorites survive a reload.
- **SPA routing on Vercel:** `vercel.json` rewrites all paths to `/` so reloading `/favorites` does not return a 404.

## Development Phases

1. **Phase 1:** TMDB popular movies grid and search
2. **Phase 2:** debounced search, infinite scroll, favorites with localStorage and `/favorites` route
3. **Phase 3:** native lazy loading of images. The AI Mood Matcher was attempted with Gemini and Groq but removed because of API availability issues (see [Prompts.md](./Prompts.md)).

AI-assisted debugging sessions are documented in [Prompts.md](./Prompts.md).

## Author

**Rahul Saini**
GitHub:RahulKS14 (https://github.com/RahulKS14)