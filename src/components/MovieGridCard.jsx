export default function MovieGridCard({movie, setCurrentMovie, setModalClicked}) {
  return (
    <div className="grid-card">
      <div className="movie-image-container">
        <img src={movie.Poster!=="N/A" ? movie.Poster:"/no-poster.png"}
        alt={movie.Title}
        className="movie-image"
        onError={(e)=>{
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/no-poster.png";
        }}></img>
      </div>
      <div className="movie-text-container">
        <div className="movie-container-name">{movie.Title}</div>
        <div className="movie-container-type-year">
          <span>{movie.Type}</span>
          <span className="movie-container-bullet-point">&bull;</span>
          <span>{movie.Year}</span>
        </div>
        <div className="movie-container-view-details"
        onClick={()=>{
          console.log("Clicked:");
          setCurrentMovie(movie);
          setModalClicked(true);
        }}>View details</div>
      </div>
    </div>
  )
}