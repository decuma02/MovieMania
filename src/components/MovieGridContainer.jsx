import React from 'react'
import MovieGridCard from './MovieGridCard'

const MovieGridContainer = ({movies}) => {
    console.log("Grid Container accessed");
    console.log(movies);
  return (
    <div className="grid-container">
        {movies?.map((movie)=>(
            <MovieGridCard
            key={movie.imdbID}
            movie={movie}/>))
        }
        
    </div>
  )
}

export default MovieGridContainer