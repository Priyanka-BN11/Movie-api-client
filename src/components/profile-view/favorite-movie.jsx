 import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";

 function FavoriteMovie(props) {
  const {movies, favouriteMovies} = props;
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let user=localStorage.getItem("user")
    let url = `https://movie-app-priya.herokuapp.com/users/${user}/movies/${id}`;

     axios.delete(url, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open(`/users/${user}`, '_self');
    }).
    catch(error => console.error(error))
  }
  const favouriteMoviesList = movies.filter(m => {
    return favouriteMovies.includes(m._id)
    // return ["62f56407669838a75a85d072"].includes(m._id)
  })
  return ( 
    <div> 
        <h2>Favorite Movies</h2>
        
    {favouriteMoviesList?favouriteMoviesList.map((movies) => {
        return (
            <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
            <h4>{movies.Title}</h4>
            </Link>
            <button onClick={() => removeFav(movies._id)}>Remove from list</button>
            </div>
        )
        }): (
          <h2>
            <span>
              You don't have movies in your favorite movies list.
            </span>
          </h2>
        )}
    </div>
  )
}

export default FavoriteMovie;