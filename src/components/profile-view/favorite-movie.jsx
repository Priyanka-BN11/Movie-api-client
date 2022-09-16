 import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
 function FavoriteMovie(props) {
  const {movies, favouriteMovies, username} = props;
  removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://movie-app-priya.herokuapp.com/users/${localStorage.getItem('username')}/movies/${id}`;
    axios.delete(url,{
      headers: { Authorization: `Bearer ${token}` },

    })
  }
 addFav = (title) => {
  let token = localStorage.getItem('token');
  axios.post(`https://movie-app-priya.herokuapp.com/users/${username}/favorites/${movieId}`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
            )
        .then((res) => {
            console.log(`Movie removed from ${username} Favorite movies`);
        })
        .catch((err) => {
            console.log(err);
        });
        } 

 
//   handleFavorite = (movieId, action) => {

//     const accessToken = localStorage.getItem('token');
//     if (accessToken !== null && username !== null) {
//         // Add MovieID to Favorites (local state & webserver)
//         if (action === 'add') {
//             this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
//             axios.post(`https://movie-app-priya.herokuapp.com/users/${username}/favorites/${movieId}`,
//             {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             }
//             )
//         .then((res) => {
//             console.log(`Movie added to ${username} Favorite movies`);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

//         // Remove MovieID from Favorites (local state & webserver)
//         } else if (action === 'remove') {
//             this.setState({
//                 favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
//             });
//             axios.delete(`https://movie-app-priya.herokuapp.com/users/${username}/favorites/${movieId}`,
//         {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         }
//             )
//         .then((res) => {
//             console.log(`Movie removed from ${username} Favorite movies`);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//         } 
//     }
// };
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
            <Button variant="danger" onClick={() => removeFav(movies._id)}>Remove Favorite</Button>
            </div>
        )
        }): (
          <h2>
            <span>
              You don't have movies in your favorite movies list.
            </span>
          </h2>
        )}
{''}
   
    </div>
    
  )
}

export default FavoriteMovie;