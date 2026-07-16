export default function MovieGridCard({ movie, setCurrentMovie, setModalClicked }) {
  function handleViewDetails() {
    setCurrentMovie(movie);
    setModalClicked(true);
  }

  return (
    <div className="grid-card">
      <div className="movie-image-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
          alt={movie.Poster !== "N/A" ? `${movie.Title} poster` : `No poster available for ${movie.Title}`}
          className="movie-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/no-poster.png";
            e.currentTarget.alt = `No poster available for ${movie.Title}`;
          }}
        />
      </div>
      <div className="movie-text-container">
        <div className="movie-container-name">{movie.Title}</div>
        <div className="movie-container-type-year">
          <span>{movie.Type}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{movie.Year}</span>
        </div>
        {/* Changed from <div> to <button> — keyboard accessible, correct semantics */}
        <button
          type="button"
          className="movie-container-view-details"
          onClick={handleViewDetails}
          aria-label={`View details for ${movie.Title}`}
        >
          View details
        </button>
      </div>
    </div>
  );
}