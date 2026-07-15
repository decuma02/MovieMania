import React from 'react'

const MovieGridCard = ({name, year, type, poster}) => {
  console.log("Grid Card accessed");
  return (
    <div className="grid-card">
      <div className="movie-image-container">
        <img src={poster} className="movie-image"></img>
      </div>
      <div className="movie-text-container">
        <div className="movie-container-name">{name}</div>
        <div className="movie-container-type-year">
          <span>{type}</span>
          <span className="movie-container-bullet-point">&bull;</span>
          <span>{year}</span>
        </div>
        <div className="movie-container-view-details">View details</div>
      </div>
    </div>
  )
}

export default MovieGridCard