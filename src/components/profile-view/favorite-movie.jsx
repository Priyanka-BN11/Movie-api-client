// import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";

 function FavoriteMovie(props) {
  const {movies, favouriteMovies} = props;
  // const removeFav = (id) => {
  //   let token = localStorage.getItem('token');
  //   let url = `https://movie-app-priya.herokuapp.com/users/${localStorage.getItem('username')}/movies/${id}`;
  //   axios.delete(url,{
  //     headers: { Authorization: `Bearer ${accessToken}` },

  //   })
  // }
  const favouriteMoviesList = movies.filter(m => {
    return favouriteMovies.includes(m._id)
    // return ["62f56407669838a75a85d072"].includes(m._id)
  })
  return ( 
    <div> 
        <h2>Favorite Movies</h2>
        {console.log(favouriteMoviesList,movies,"FAV MOVIE")}
    {favouriteMoviesList?favouriteMoviesList.map((movies) => {
        return (
            <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
            <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
            </div>
        )
        }):null
    }</div>
  )
}
export default FavoriteMovie;