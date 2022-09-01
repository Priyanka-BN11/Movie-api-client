//Import react into file
import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
//Exporting the MainView component makes it available for use by other components, modules, and files
class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [ 
            { _id:1, Title: 'Inception', Description: 'desc1...', ImagePath: 'https://i.pinimg.com/originals/32/a9/de/32a9de78b9c189b26666b15ffecd72b9.jpg'},
            { _id:2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg'},
            { _id:3, Title: 'Joker', Description: 'desc3...', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Joker_%282019_film%29_poster.jpg/220px-Joker_%282019_film%29_poster.jpg'}
        ],
            selectedMovie: null
        };
    }
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    render() {
        const { movies, selectedMovie} = this.state;
        if(selectedMovie) return <MovieView movie = {selectedMovie}/>;
        if(movies.length === 0) return <div className="main-view">The list is empty</div>; 
        //Displays
        //JSX
        return (
            <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
    }
}
export default MainView;