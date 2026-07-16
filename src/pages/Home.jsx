import {useEffect, useState} from 'react'
import MovieGridContainer from '../components/MovieGridContainer'
import axios, { isCancel, AxiosError } from "axios";
import toast from 'react-hot-toast';
import MovieModal from '../components/MovieModal';
import SpinningAnimation from '../components/SpinningAnimation';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [debouncingQuery, setDebouncingQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalClicked, setModalClicked] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncingQuery(query);
        }, 500);

        return ()=>{
            clearTimeout(timerId);
        }
    }, [query]);

    useEffect(()=>{
        

        const fetchMovies = async ()=>{

            if(!debouncingQuery.trim()){
                setMovies([]);
                return;
            }
            setLoading(true);
            try{
                const API_KEY = import.meta.env.VITE_OMDB_API
                const response = await axios.get("https://omdbapi.com",{
                    params:{
                        s:debouncingQuery,
                        apikey:API_KEY
                    }
                })

                if(response.data.Response=="True"){
                    setMovies(response.data.Search);
                }else{
                    setMovies([]);
                    toast.error(response.data.Error || "No movies found.");
                }
            }catch(error){
                console.log("Error:", error);
                toast.error("Network error.Failed to reach the movie database...")
            }finally{
                setLoading(false);
            }
        }

        fetchMovies();
    }, [debouncingQuery]);

    
  return (
    <div className="home">
        <div className="page-top"></div>
        <div className="search-bar">
            <div className="search-icon"></div>
            <input className="search-box"
            placeholder='search a movie'
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}></input>
        </div>
        
        {loading ? <SpinningAnimation/>:(
            <>
                {modalClicked &&(<MovieModal
                    currentMovie={currentMovie}
                    setModalClicked={setModalClicked}/>)}
                
                <MovieGridContainer
                movies={movies}
                setCurrentMovie={setCurrentMovie}
                setModalClicked={setModalClicked}/>
            </>
        )}
    </div>
  )
}

export default Home