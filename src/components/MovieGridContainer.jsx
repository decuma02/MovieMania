import React from 'react'
import MovieGridCard from './MovieGridCard'

const MovieGridContainer = ({movies, setCurrentMovie, setModalClicked}) => {
  return (
    <div className="grid-container">
        {movies?.map((movie)=>(
            <MovieGridCard
            key={movie.imdbID}
            movie={movie}
            setCurrentMovie={setCurrentMovie}
            setModalClicked={setModalClicked}/>))
        }
    </div>
  )
}

export default MovieGridContainer