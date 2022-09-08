import React from 'react';

// import PropTypes from 'prop-types';
import { Button, Card, Row, Col, Container, CardGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick } = this.props;
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
									<Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
								</Card.Body>
							</CardGroup>
          				</Card>
		  			</Col>
		  		</Row>
		  	</Container>
            );
    }
}
// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       ImagePath: PropTypes.string.isRequired,
//       Genre:PropTypes.string.isRequired,
//       Director:PropTypes.string.isRequired,
//       Actors:PropTypes.string.isRequired
//     }).isRequired,
//     onMovieClick: PropTypes.func.isRequired
//   };

