import React from 'react';
import ReactDOM  from 'react-dom';
import { MainView } from './components/main-view/main-view';
import { MovieCard } from './components/movie-card/movie-card';
import { MovieView } from './components/movie-view/movie-view';
//Importing statement to indicate that you need to bundle './index.scss'
import './index.scss';

//Main component(will eventually use all the others)
class MovieApp extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [
                { _id:1, Title: 'Inception', Description: 'desc1...', ImagePath: 'https://i.pinimg.com/originals/32/a9/de/32a9de78b9c189b26666b15ffecd72b9.jpg'},
                { _id:2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg'},
                { _id:3, Title: 'Joker', Description: 'desc3...', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Joker_%282019_film%29_poster.jpg/220px-Joker_%282019_film%29_poster.jpg'}
            ]
        }
    }
    render(){
        const movies = this.state.movies;
        if(movies.length === 0) {
            return <div className="main-view">The list is empty</div>;
        }
            return (
                <div className="main-view">
                          <button onClick={() => {alert('Nice!')}}>Click me!</button>
                    {movies.map((movie) => <MovieCard key={movie._id} movie={movie}/>)}
                </div>
                );
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MovieApp), container);