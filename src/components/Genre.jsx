import React from 'react'

const Genre =({genre})=>{
  console.log(genre);
  return(
    <div className="movie-modal-card-genre">
        {genre}
    </div>
  )
}

export default Genre