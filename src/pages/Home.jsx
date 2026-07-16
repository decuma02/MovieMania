import {useEffect, useState, useRef} from 'react'
import MovieGridContainer from '../components/MovieGridContainer'
import axios from "axios";
import toast from 'react-hot-toast';
import MovieModal from '../components/MovieModal';
import SpinningAnimation from '../components/SpinningAnimation';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [debouncingQuery, setDebouncingQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalClicked, setModalClicked] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const topAnchorRef = useRef(null);

    useEffect(()=>{
        if(!loading || movies.length>0){
            topAnchorRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }
    },[loading])

    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncingQuery(query);
            setCurrentPage(1);
        }, 500);

        return ()=>{
            clearTimeout(timerId);
        }
    }, [query]);

    useEffect(()=>{
        

        const fetchMovies = async ()=>{

            if(!debouncingQuery.trim()){
                setMovies([]);
                setTotalResults(0);
                return;
            }
            setLoading(true);
            try{
                const API_KEY = import.meta.env.VITE_OMDB_API
                const response = await axios.get("https://omdbapi.com",{
                    params:{
                        s:debouncingQuery,
                        apikey:API_KEY,
                        page:currentPage
                    }
                });

                if(response.data.Response=="True"){
                    setMovies(response.data.Search);
                    setTotalResults(parseInt(response.data.totalResults, 10));  
                }else{
                    setMovies([]);
                    setTotalResults(0);
                    toast.error(response.data.Error || "No movies found.");
                }
            }catch(error){
                console.log("Error:", error);
                toast.error("Network error. Failed to reach the movie database...")
            }finally{
                setLoading(false);
            }
        }

        fetchMovies();
    }, [debouncingQuery, currentPage]);

    const totalPages =Math.ceil(totalResults/10);
    
  return (
    <div className="home">
        <div ref={topAnchorRef} className="page-top"></div>
        <div className="search-bar">
            <div className="search-icon"></div>
            <input className="search-box"
            placeholder='Search a movie'
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}></input>
        </div>
        
        {loading && <SpinningAnimation/>}
        {modalClicked &&(<MovieModal
            currentMovie={currentMovie}
            setModalClicked={setModalClicked}/>)}
        {!loading && movies.length===0 && (
          <div className="grid-container-movies-not-available">Search a movie</div>
        )}
        <MovieGridContainer
        movies={movies}
        setCurrentMovie={setCurrentMovie}
        setModalClicked={setModalClicked}/>

        {movies.length>0 && (
            <div className="pagination-ui">
                <button
                className="prev-btn"
                disabled={currentPage===1 || loading}
                onClick={()=>{
                    setCurrentPage(prev=>prev-1);
                }}>previous</button>
                <span className="current-page-box">{currentPage}</span>
                <button
                className="next-btn"
                disabled={currentPage===totalPages || loading}
                onClick={()=>{
                    setCurrentPage(prev=>prev+1);
                }}>next</button>
            </div>
        )}
    </div>
  )
}