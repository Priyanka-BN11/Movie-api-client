//Import react into file
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {NavBar} from '../Navbar/navbar';
import {Row, Col, Container} from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

//Exporting the MainView component makes it available for use by other components, modules, and files
class MainView extends React.Component {
    constructor(){
        super();
         // code executed right when the component is created in the memory
        // Initial state is set to null
         this.state = {
            movies: [],
            user: null,favoriteMovies:[]
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

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData){
        console.log(authData);
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
        window.open('/', '_self');
    }
    render() {
        const { movies, user, favoriteMovies} = this.state;        
        // console.log(movies,"movie at this render") 

            return (
                <Router>
                    <NavBar user={user} />
                    <Container fluid>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path = "/" render={() => {
                           // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
                           //passed as a prop to the LoginView
                           if(!user) return <Col>
                           <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)}/>
                           </Col>
                           //Before the movies have been loaded
                           if(movies.length === 0) return <div className="main-view"/>;
                           return movies.map(m => (
                            <Col md={3} key={m._id} >
                                <MovieCard movie={m}/>
                            </Col>
                           ))
                        }}/>
                        <Route path="/register" render={() => {
                            if(user) return <Redirect to ="/" />
                            return <Col lg={8} md={8}>
                                <RegistrationView/>
                            </Col>
                        }}/>
                        <Route path="/movies/:id" render={({match, history}) =>
                        {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() =>
                                history.goBack()}/>
                            </Col>
                        }}/>
                        
                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}  movies={movies} onBackClick={() => history.goBack()} />
                            </Col>
                        }
                        } />

                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} onBackClick={() => history.goBack()} />
                                            </Col>
                                        }}/>
                            {/* route for link on main-view to profile-view */}
                            <Route path={`/users/${user}`} render={({history}) => {
                                               if (!user) return <Col>
                                               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                             </Col>
                                                  if (movies.length === 0) return <div className="main-view" />;

                                                return <Col md={8}>
                                                    <ProfileView 
                                                    movies={movies}
                                                    user={user} 
                                                    onBackClick={() => history.goBack()}
                                                    />
                                                </Col>
                                            }} />     
                    </Row>
                    </Container>
                
                    </Router>  
            );
    }
}
export default MainView;