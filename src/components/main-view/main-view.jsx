//Import react into file
import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
//Exporting the MainView component makes it available for use by other components, modules, and files
class MainView extends React.Component {
    constructor(){
        super();
         // code executed right when the component is created in the memory
        this.state = {
            movies: [],
            selectedMovie: null
        };
    }
    componentDidMount(){
    // code executed right after the component is added to the DOM.
        axios.get('https://movie-app-priya.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies:response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    componentWillUnmount(){
    // code executed just before the moment the component gets removed from the DOM.

    }
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    render() {
        const { movies, selectedMovie} = this.state;
        // if(selectedMovie) return <MovieView movie = {selectedMovie}/>;
        if(movies.length === 0) return <div className="main-view">The list is empty</div>; 
        //Displays movie list
        //JSX
        return (
            <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              ))
            }
          </div>
        );
    }
}
export default MainView;