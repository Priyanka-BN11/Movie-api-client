 import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";
import {Button, Card, CardGroup, Row, Col} from 'react-bootstrap';
import './favorite-movie.scss';
 function FavoriteMovie(props) {
  const {movies, favouriteMovies} = props;

  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let user=localStorage.getItem("user")

    let url = `https://movie-app-priya.herokuapp.com/users/${user}/Movies/${id}`;
    axios.delete(url,{
      headers: { 'Authorization': `Bearer ${token}` },

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
   
    <CardGroup>
    <Card> 
      <Card.Header as="h5">Favorite Movies</Card.Header>  
      <Card.Body className="sameline" variant="outlined">
    {favouriteMoviesList?favouriteMoviesList.map((movies) => {
        return (
          
            <div key={movies._id} className='col-4'>
            <img src={movies.ImagePath}  />
            <Link to={`/movies/${movies._id}`}>
            <h4>{movies.Title}</h4>
            </Link>
            <Button variant="danger" onClick={() => removeFav(movies._id)}>Remove Favorite</Button>
            <br/>
            <br/>
            </div>
             
        )
        }):null}
      
        </Card.Body>
    </Card>
    </CardGroup>
    

  )
}

export default FavoriteMovie;