// import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
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
    //  addFav = (movieId) => {
    //     let token = localStorage.getItem('token');
    //     let username = localStorage.getItem("user");

    //     axios.post(`https://movie-app-priya.herokuapp.com/users/${username}/Movies/${movieId}`,{},
    //           {
    //               headers: { 
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}` },
    //           }
    //               )
    //           .then(() => {
    //               console.log(`Movie added to ${username} Favorite movies`);
    //           })
    //           .catch((err) => {
    //               console.log(err);
    //           });
    //           } ;
      
    render(){
        const {movie, onBackClick} = this.props;
       
        return(
            <div className="movie-view">
                <div className="movie-poster">
                    <img src ={movie.ImagePath}/> 
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    <span className="value">{movie.Actors}</span>

                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
  <Button variant="link">Director</Button>
</Link>

<Link to={`/genres/${movie.Genre.Name}`}>
  <Button variant="link">Genre</Button>
</Link>
                {/* <Button onClick={() => {this.addFav(movie._id)} }>Add Favorite</Button>  */}
                <Button onClick={() => {onBackClick(null); }} variant="warning">Back</Button>
            </div>
        );
    }
}
export default MovieView;