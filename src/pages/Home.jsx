import { useEffect, useState, useRef } from 'react';
import MovieGridContainer from '../components/MovieGridContainer';
import axios from "axios";
import toast from 'react-hot-toast';
import MovieModal from '../components/MovieModal';
import SpinningAnimation from '../components/SpinningAnimation';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncingQuery, setDebouncingQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalClicked, setModalClicked] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const topAnchorRef = useRef(null);
  // Unique id for the search input ↔ label association
  const searchInputId = "movie-search-input";

  // Scroll to top when loading finishes
  useEffect(() => {
    if (!loading || movies.length > 0) {
      topAnchorRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading]);

  // Debounce query input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncingQuery(query);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timerId);
  }, [query]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncingQuery.trim()) {
        setMovies([]);
        setTotalResults(0);
        return;
      }
      setLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_OMDB_API;
        const response = await axios.get("https://omdbapi.com", {
          params: {
            s: debouncingQuery,
            apikey: API_KEY,
            page: currentPage,
          },
        });
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          setTotalResults(parseInt(response.data.totalResults, 10));
        } else {
          setMovies([]);
          setTotalResults(0);
          toast.error(response.data.Error || "No movies found.");
        }
      } catch (error) {
        toast.error("Network error. Failed to reach the movie database...");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [debouncingQuery, currentPage]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="home">
      {/* Scroll-to-top anchor */}
      <div ref={topAnchorRef} className="page-top" />

      {/* ── Search bar ─────────────────────────────────── */}
      {/*
        Added:
        - <label> visually hidden but associated via htmlFor/id
        - id on the input so the label works
        - aria-label on the wrapper for extra context
      */}
      <div
        className="search-bar"
        role="search"
        aria-label="Search movies"
      >
        {/* Visually hidden label — screen readers read it, sighted users see placeholder */}
        <label htmlFor={searchInputId} className="sr-only">
          Search for a movie
        </label>
        <div className="search-icon" aria-hidden="true" />
        <input
          id={searchInputId}
          className="search-box"
          type="search"
          placeholder="Search a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          aria-label="Search for a movie by title"
        />
      </div>

      {/* ── Loading spinner ─────────────────────────────── */}
      {loading && <SpinningAnimation />}

      {/* ── Movie detail modal ──────────────────────────── */}
      {modalClicked && (
        <MovieModal
          currentMovie={currentMovie}
          setModalClicked={setModalClicked}
        />
      )}

      {/* ── Empty / prompt state ────────────────────────── */}
      {!loading && movies.length === 0 && (
        <p
          className="grid-container-movies-not-available"
          aria-live="polite"
          aria-atomic="true"
        >
          {debouncingQuery.trim() ? "No results found" : "Search a movie"}
        </p>
      )}

      {/* ── Live region — announces result count to screen readers ── */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {!loading && movies.length > 0 && (
          `Showing page ${currentPage} of ${totalPages}. ${movies.length} results loaded.`
        )}
      </div>

      {/* ── Movie grid ──────────────────────────────────── */}
      <MovieGridContainer
        movies={movies}
        setCurrentMovie={setCurrentMovie}
        setModalClicked={setModalClicked}
      />

      {/* ── Pagination ──────────────────────────────────── */}
      {movies.length > 0 && (
        <nav
          className="pagination-ui"
          aria-label={`Pagination, page ${currentPage} of ${totalPages}`}
        >
          <button
            type="button"
            className="prev-btn"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            aria-label="Go to previous page"
          >
            Previous
          </button>

          {/* Page indicator */}
          <span
            className="current-page-box"
            aria-current="page"
            aria-label={`Page ${currentPage} of ${totalPages}`}
          >
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            className="next-btn"
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            aria-label="Go to next page"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}