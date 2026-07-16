import { useEffect, useState, useRef, useCallback } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import Genre from './Genre';
import SpinningAnimation from './SpinningAnimation';

export default function MovieModal({ currentMovie, setModalClicked }) {
  const [modalMovie, setModalMovie] = useState({});
  const [loading, setLoading] = useState(false);

  // Refs for focus management
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // ── Lock body scroll ─────────────────────────────────────
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // ── Auto-focus the close button when modal opens ─────────
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [loading]);

  // ── Fetch movie detail ───────────────────────────────────
  useEffect(() => {
    const findMovieById = async (id) => {
      setLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_OMDB_API;
        const response = await axios.get("https://omdbapi.com", {
          params: { i: id, apikey: API_KEY },
        });
        if (response.data.Response === "True") {
          setModalMovie(response.data);
        } else {
          setModalMovie({});
          toast.error(response.data.Error || "No movies found.");
        }
      } catch (error) {
        toast.error("Network error. Failed to reach the movie database...");
      } finally {
        setLoading(false);
      }
    };
    findMovieById(currentMovie.imdbID);
  }, [currentMovie]);

  // ── Close handlers ───────────────────────────────────────
  const handleClose = useCallback(() => {
    setModalClicked(false);
  }, [setModalClicked]);

  // ── Keyboard: Escape to close, Tab to trap focus ─────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      // Focus trap: keep Tab inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusable);
        if (focusableArray.length === 0) return;

        const firstEl = focusableArray[0];
        const lastEl = focusableArray[focusableArray.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const posterSrc = modalMovie.Poster && modalMovie.Poster !== "N/A"
    ? modalMovie.Poster
    : "/no-poster.png";

  return (
    // Overlay — clicking outside closes modal
    <div
      className="movie-modal-overlay"
      onClick={handleClose}
      aria-hidden="true"
    >
      {/* Dialog — stop click propagation */}
      <div
        ref={dialogRef}
        className="movie-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        // aria-hidden false on dialog so screen readers enter it
        aria-hidden={false}
      >
        {loading ? (
          <SpinningAnimation />
        ) : (
          <>
            {/* Close button — now a real <button> */}
            <button
              ref={closeButtonRef}
              type="button"
              className="movie-modal-close-btn"
              onClick={handleClose}
              aria-label="Close movie details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="#838383"
                  d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z"
                />
              </svg>
            </button>

            <div className="movie-modal-card-header">
              <div id="modal-title" className="movie-model-card-name">
                {modalMovie.Title}
              </div>
              <div className="movie-modal-card-genre-container">
                {modalMovie?.Genre?.split(',')?.map((genre, index) => (
                  <Genre genre={genre.trim()} key={index} />
                ))}
              </div>
            </div>

            <div className="movie-modal-card-body">
              <div className="movie-modal-card-image-container">
                <img
                  className="movie-modal-card-image"
                  src={posterSrc}
                  alt={
                    modalMovie.Poster !== "N/A"
                      ? `${modalMovie.Title} movie poster`
                      : `No poster available for ${modalMovie.Title}`
                  }
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/no-poster.png";
                  }}
                />
              </div>

              <div className="movie-modal-card-text-container">
                <p className="movie-modal-card-text-description">{modalMovie.Plot}</p>
                <p className="movie-modal-card-text-bold">
                  Director: <span className="movie-modal-card-text-unbold">{modalMovie.Director}</span>
                </p>
                <p className="movie-modal-card-text-bold">
                  Actors: <span className="movie-modal-card-text-unbold">{modalMovie.Actors}</span>
                </p>
                <p className="movie-modal-card-text-bold">
                  Box Office: <span className="movie-modal-card-text-unbold">{modalMovie.BoxOffice}</span>
                </p>
                <p className="movie-modal-card-text-bold">
                  Year: <span className="movie-modal-card-text-unbold">{modalMovie.Year}</span>
                </p>
                <p className="movie-modal-card-text-bold">
                  Runtime: <span className="movie-modal-card-text-unbold">{modalMovie.Runtime}</span>
                </p>
                <p className="movie-modal-card-text-bold">
                  Language: <span className="movie-modal-card-text-unbold">{modalMovie.Language}</span>
                </p>
                <p className="movie-modal-card-text-bold">
                  Rated: <span className="movie-modal-card-text-unbold">{modalMovie.Rated}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}