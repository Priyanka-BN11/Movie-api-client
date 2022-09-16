import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, Container, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
 export class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        return (
			<Container>
				<Row>
					<Col>
						<Card>
							<CardGroup>
								<Card.Img varient="top" src={movie.ImagePath}/>
								<Card.Body>
									<Card.Title>{movie.Title}</Card.Title>
									<Card.Text>{movie.Description}</Card.Text>
									<Link to={`/movies/${movie._id}`}>
										<Button variant="link">Open</Button>
									</Link>
								</Card.Body>
							</CardGroup>
          				</Card>
		  			</Col>
		  		</Row>
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

