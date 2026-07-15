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
            name={movie.Title}
            year={movie.Year}
            type={movie.Type}
            poster={movie.Poster}/>))
        }
        
    </div>
  )
}

export default MovieGridContainer