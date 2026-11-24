const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_URL = "https://image.tmdb.org/t/p/w500";

async function request(path, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, ...params });
  const res = await fetch(`${BASE_URL}${path}?${query}`);
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export const getPopularMovies = (page = 1) =>
  request("/movie/popular", { page });

export const searchMovies = (query, page = 1) =>
  request("/search/movie", { query, page });