//Import react into file
import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import {Row, Col} from 'react-bootstrap';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
//Exporting the MainView component makes it available for use by other components, modules, and files
class MainView extends React.Component {
    constructor(){
        super();
         // code executed right when the component is created in the memory
        // Initial state is set to null
         this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }
    componentDidMount(){
    // code executed right after the component is added to the DOM.
        let accessToken = localStorage.getItem('token');
        if(accessToken !== null){
            this.setState({
                user:localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }
    componentWillUnmount(){
    // code executed just before the moment the component gets removed from the DOM.

    }
    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(movie){
        this.setState({
            selectedMovie: movie
        });
    }
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData){
        // console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
    getMovies(token) {
        axios.get('https://movie-app-priya.herokuapp.com/movies',{
           headers: {'Authorization': `Bearer ${token}`} 
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                movies:response.data
            });
        })
        .catch(function(error){
            console.log(error);
        })
    }
    onLoggedOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user:null
        });
    }
    render() {
        const { movies, selectedMovie, user} = this.state;
         /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if(movies.length === 0) return <div className="main-view">The list is empty</div>; 
        //Displays movie list
        //JSX
        return (
            <Row className="main-view justify-content-md-center">
                { selectedMovie
                ? (
                    <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </Col>  
                )
                : movies.map(movie => (
                    <Col md={3}key={movie._id} >
                        <MovieCard  movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) ;}}/>
                    </Col>
                    ))
                }
                </Row>  
        );
    }
}
export default MainView;