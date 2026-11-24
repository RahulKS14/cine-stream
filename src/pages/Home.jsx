import { useEffect, useRef, useState } from "react";
import { getPopularMovies, searchMovies } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = useDebounce(text.trim(), 500);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    const request = query ? searchMovies(query, page) : getPopularMovies(page);

    request
      .then((data) => {
        if (cancelled) return;
        setMovies((prev) => {
          if (page === 1) return data.results;
          const seen = new Set(prev.map((m) => m.id));
          return [...prev, ...data.results.filter((m) => !seen.has(m.id))];
        });
        setTotalPages(data.total_pages);
      })
      .catch(() => {
        if (!cancelled) setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, page]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, page, totalPages]);

  return (
    <>
      
      <SearchBar value={text} onChange={setText} />

      {error && <p className="status error">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="status">No movies found.</p>
      )}

      <MovieGrid movies={movies} />

      {loading && <p className="status">Loading...</p>}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}