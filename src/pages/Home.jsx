import {} from 'react'
import MovieGridContainer from '../components/MovieGridContainer'
import axios, { isCancel, AxiosError } from "axios";

const Home = () => {
    console.log(axios.isCancel("something"));
  return (
    <div className="home">
        <div className="page-top"></div>
        <div className="search-bar">
            <div className="search-icon"></div>
            <input className="search-box"></input>
        </div>
        <MovieGridContainer/>
        <div>Home</div>
    </div>
  )
}

export default Home