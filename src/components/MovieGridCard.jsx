import React from 'react'

const MovieGridCard = ({movie}) => {
  console.log("Grid Card accessed");
  return (
    <div className="grid-card">
      <div className="movie-image-container">
        <img src={movie.Poster} className="movie-image"></img>
      </div>
      <div className="movie-text-container">
        <div className="movie-container-name">{movie.Title}</div>
        <div className="movie-container-type-year">
          <span>{movie.Type}</span>
          <span className="movie-container-bullet-point">&bull;</span>
          <span>{movie.Year}</span>
        </div>
        <div className="movie-container-view-details">View details</div>
      </div>
    </div>
  )
}

export default MovieGridCard