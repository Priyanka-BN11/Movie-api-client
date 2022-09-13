import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";

 function FavoriteMovie({favoriteMovieList}) {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://movie-app-priya.herokuapp.com/users/${localStorage.getItem('username')}/movies/${id}`;
    axios.delete(url,{
      headers: { Authorization: `Bearer ${accessToken}` },

    })
  }
  return (
    <div> 
        <h2>Favorite Movies</h2>
    {favoriteMovieList.map((movies) => {
        return (
            <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
            <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
            </div>
        )
        })
    }</div>
  )
}
export default FavoriteMovie;