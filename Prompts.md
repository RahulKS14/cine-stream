# AI Debugging Sessions

Sprint 08: Cine-Stream. These are the real problems I faced and what I learned from each.

## Session 1: Structuring the app and API layer
- **Prompt:** How should I structure a React app that fetches from TMDB, and where should the API key live?
- **What I learned:** Keep all requests in one `api/tmdb.js` file, read the key with `import.meta.env.VITE_TMDB_KEY`, and put it in `.env.local` so it is not committed. TMDB returns only a relative poster path, so I join it with `https://image.tmdb.org/t/p/w500`.

## Session 2: Debounced search
- **Prompt:** How do I stop the search from calling the API on every keystroke?
- **What I learned:** A `useDebounce` hook with `setTimeout` and a cleanup `clearTimeout`. I checked it in the Network tab: typing "batman" quickly gives one request with `query=batman`.

## Session 3: Infinite scroll
- **Prompt:** How do I load the next page when the user reaches the bottom without a library?
- **What I learned:** Put a 1px sentinel `div` under the grid and watch it with `IntersectionObserver`. Guard with `!loading` and `page < totalPages` to avoid double fetches. Append with `[...prev, ...new]` and reset the list when the query changes. A `cancelled` flag in the effect ignores stale responses.

## Session 4: "Encountered two children with the same key" (69 console errors)
- **Prompt:** Console shows duplicate key errors for ids like 755898 after scrolling.
- **What I learned:** TMDB sometimes returns the same movie on different pages. I filter new results with a `Set` of existing ids before appending, so keys stay unique.

## Session 5: Failed to resolve import "react-router-dom"
- **Prompt:** Vite shows "Failed to resolve import react-router-dom from src/main.jsx".
- **What I learned:** The package was never installed. Running `npm install react-router-dom` in the project folder (not in the terminal running the dev server) and restarting fixed it.

## Session 6: Favorites with localStorage
- **Prompt:** How do I share favorites between Home and the favorites page and keep them after reload?
- **What I learned:** A Context provider with lazy `useState(() => JSON.parse(localStorage...))` for the initial value and a `useEffect` that saves on every change. I verified it in DevTools under Application > Local Storage.

## Session 7: AI Mood Matcher (Gemini, then Groq) - not shipped
- **Prompt:** My Gemini call returns 404, then 503, then hangs on "pending". Then Groq returns `model_not_found`.
- **What I learned:** I read the real response body in the console instead of guessing. `gemini-2.5-flash` returned 404 NOT_FOUND on `generateContent` for my key, other models returned 503 (overloaded), and requests can hang, so a timeout with `AbortSignal.timeout` is useful. Switching to Groq gave a model access error for `llama-3.3-70b-versatile`. After repeated attempts I removed the optional Priority 2 Mood Matcher so the required features stayed stable. The design was: LLM returns one title, then I pass it silently into the TMDB search.

## Session 8: Vercel deployment showing "Something went wrong"
- **Prompt:** The app works locally but on Vercel no movies load.
- **What I learned:** `.env.local` is not pushed to GitHub, so `VITE_TMDB_KEY` was undefined in production. Vite bakes env variables in at build time, so I added the variable in Vercel Environment Variables and redeployed. I also added `vercel.json` with a rewrite so `/favorites` does not 404 on reload.