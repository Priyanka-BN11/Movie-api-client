import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, Container, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {AiOutlineHeart} from "react-icons/ai";
 export class MovieCard extends React.Component {
	constructor(){
        super();
         // code executed right when the component is created in the memory
        // Initial state is set to null
         this.state = {
            active:'',
			heartColor:"rgb(235, 161, 161)"
        };
    }
	
	addFav = (movieId) => {
		let token = localStorage.getItem('token');
		let username = localStorage.getItem("user");

		axios.post(`https://movie-app-priya.herokuapp.com/users/${username}/Movies/${movieId}`,{},
			  {
				  headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}` },
			  }
				  )
			  .then((data) => {
				this.setState({heartColor:"red"})
				localStorage.setItem("favMovies",JSON.stringify( data.data.FavoriteMovies))
				console.log(`Movie added to ${username} Favorite movies`);
				alert(`Movie added to ${username} Favorite movies`);
			  })
			  .catch((err) => {
				  console.log(err);
			  });
			  } ;
			  
			  removeFav = (id) => {
				let token = localStorage.getItem('token');
    let user=localStorage.getItem("user")

    let url = `https://movie-app-priya.herokuapp.com/users/${user}/Movies/${id}`;
    axios.delete(url,{
      headers: { 'Authorization': `Bearer ${token}` },

    })
    .then((updatedUser) => {
         alert(`The movie was successfully deleted.`)
         localStorage.setItem("favMovies",JSON.stringify(updatedUser.data.FavoriteMovies) )
         this.setState({heartColor:"rgb(235, 161, 161)"})
           window.open(`/`, '_self');      


    }).
    catch(error => console.error(error))
			  }
    render() {
        const {movie, movies} = this.props;
// get the favMovies of the user from the localstorage
const favMoviesIds= JSON.parse(localStorage.getItem("favMovies"))??[]
        
 // check to see if this movie has been add to the user's fav movies
const inList=favMoviesIds.find(id=>id===movie._id)
		
		
        return (
			<Container fluid xl={12}>
						<Card>
							<CardGroup>
								<Card.Img varient="top" src={movie.ImagePath}/>
								<Card.Body>
									<Card.Title>{movie.Title}</Card.Title>
									<Card.Text>{movie.Description}</Card.Text>
								</Card.Body>
								<Card.Footer variant="bottom"style={{width: '20rem', backgroundColor:'white'}}>
									<Link to={`/movies/${movie._id}`}>
										<Button variant="link">Open</Button>
									</Link>
									<Button style= {{backgroundColor:'transparent', border: 'transparent'}} 
									 onClick={() => {
										inList?this.removeFav(movie._id):this.addFav(movie._id);
									   
									   } }

							   >
										<FaHeart 
										color={inList?"red":this.state.heartColor}
										className="heartIcon"/>	
										</Button> 					
										</Card.Footer>
							</CardGroup>
          				</Card>
			</Container>
            );
    }
}
MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func,
  };

