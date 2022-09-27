// import axios from 'axios';
import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
export class MovieView extends React.Component{
    keypressCallback(event){
        console.log(event.key);
    }
    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }
    //removes the event listener when the component is about to be unmounted
    componentWillUnmount(){
        document.removeEventListener('keypress',this.keypressCallback);
    }
      
    render(){
        const {movie, onBackClick} = this.props;
       
        return(
            <Container>
            <Card className="movie-view">
                <Card.Header>{movie.Title}</Card.Header>
                    <Card.Img src ={movie.ImagePath}  style={{ width: '15rem' }}/> 
                    <Card.Body>                    
                        <Card.Text>Description:{movie.Description} </Card.Text>
                        <Card.Text>Genre: {movie.Genre.Name} </Card.Text>
                        <Card.Text>Director: {movie.Director.Name} </Card.Text>
                        <Card.Text>Actors: {movie.Actors}</Card.Text>
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">Director</Button>
                        </Link>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">Genre</Button>
                        </Link>
                        <Button onClick={() => {onBackClick(null) }} variant="primary">Back</Button>
                    </Card.Body>
            </Card>
            </Container>
        );
    }
}
export default MovieView;