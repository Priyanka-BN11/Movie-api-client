import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, Container, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
 export class MovieCard extends React.Component {
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
			  .then(() => {
				  console.log(`Movie added to ${username} Favorite movies`);
			  })
			  .catch((err) => {
				  console.log(err);
			  });
			  } ;
    render() {
        const {movie} = this.props;
	
        return (
			<Container fluid xl={12}>

						<Card>
							<CardGroup>
								<Card.Img varient="top" src={movie.ImagePath}/>
								<Card.Body>
									<Card.Title>{movie.Title}</Card.Title>
									<Card.Text>{movie.Description}</Card.Text>
									<Link to={`/movies/${movie._id}`}>
										<Button variant="link">Open</Button>
									</Link>
									<Button onClick={() => {this.addFav(movie._id); alert('Movie added to favorites')} }><FaHeart /></Button> 
									
									
								</Card.Body>
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

