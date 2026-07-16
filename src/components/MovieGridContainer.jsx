import MovieGridCard from './MovieGridCard'

export default function MovieGridContainer({movies, setCurrentMovie, setModalClicked}) {
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