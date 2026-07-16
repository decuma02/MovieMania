import {useEffect, useState} from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import Genre from './Genre';
import SpinningAnimation from './SpinningAnimation';

export default function MovieModal({currentMovie, setModalClicked}) {


  const [modalMovie, setModalMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
        const originalStyle = window.getComputedStyle(document.body).overflow;

        document.body.style.overflow='hidden';

        return ()=>{
            document.body.style.overflow = originalStyle;
        }
    },[])

    useEffect(()=>{
      const findMovieById=async function (id){
        setLoading(true);
        try{
            const API_KEY = import.meta.env.VITE_OMDB_API
            const response = await axios.get("https://omdbapi.com",{
                params:{
                    i:id,
                    apikey:API_KEY
                }
            })
            console.log("modalMovie:",response);
            if(response.data.Response=="True"){
                setModalMovie(response.data);
            }else{
                setModalMovie([]);
                toast.error(response.data.Error || "No movies found.");
            }
        }catch(error){
            console.log("Error:", error);
            toast.error("Network error.Failed to reach the movie database...")
        }finally{
          setLoading(false);
        }
    };
    findMovieById(currentMovie.imdbID);
    }, [currentMovie])


  return (
    <div className="movie-modal-overlay"
    onClick={()=>{
      setModalClicked(false);
    }}>
      <div className="movie-modal-card"
      onClick={(e)=>{
        e.stopPropagation();
      }}>
        {loading ? <SpinningAnimation/> :(
        <>
          <svg
            className="movie-modal-close-btn"
            onClick={()=>{
              setModalClicked(false);
            }}
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="#838383" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" />
          </svg>
          <div className="movie-modal-card-header">
            <div className="movie-model-card-name">{modalMovie.Title}</div>
            <div className="movie-modal-card-genre-container">
              {modalMovie && modalMovie?.Genre?.split(',')?.map((genre, index)=>(
                <Genre
                genre={genre.trim()}
                key={index}
                />
              ))}
            </div>
          </div>
          <div className="movie-modal-card-body">
            <div className="movie-modal-card-image-container">
              <img className="movie-modal-card-image"
              src={modalMovie.Poster!=="N/A" ? modalMovie.Poster:"/no-poster.png"}/>
            </div>
            <div className="movie-modal-card-text-container">
              <p className="movie-modal-card-text-description">{modalMovie.Plot}</p>
              <p className="movie-modal-card-text-bold">Director: <span className="movie-modal-card-text-unbold">{modalMovie.Director}</span></p>
              <p className="movie-modal-card-text-bold">Actors: <span className="movie-modal-card-text-unbold">{modalMovie.Actors}</span></p>
              <p className="movie-modal-card-text-bold">Box Office: <span className="movie-modal-card-text-unbold">{modalMovie.BoxOffice}</span></p>
              <p className="movie-modal-card-text-bold">Year: <span className="movie-modal-card-text-unbold">{modalMovie.Year}</span></p>
              <p className="movie-modal-card-text-bold">Runtime: <span className="movie-modal-card-text-unbold">{modalMovie.Runtime}</span></p>
              <p className="movie-modal-card-text-bold">Language: <span className="movie-modal-card-text-unbold">{modalMovie.Language}</span></p>
              <p className="movie-modal-card-text-bold">Rated: <span className="movie-modal-card-text-unbold">{modalMovie.Rated}</span></p>
            </div>
          </div>
        </>
        )}
        
      </div>
    </div>
  )
}