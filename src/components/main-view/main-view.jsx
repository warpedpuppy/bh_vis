import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                {
                     _id: 1,
                    Title: "The Last Dance",
                    ImagePath: "https://en.wikipedia.org/wiki/File:The_Last_Dance_2020.jpg",
                    Genre: "Documentary",
                    Description: "is a non-fiction movie that documents reality for education."
                },
                {
                    _id: 2,
                    Title: "Training Day",
                    ImagePath: "https://upload.wikimedia.org/wikipedia/en/b/b3/Training_Day_Poster.jpg",
                    Genre: "Crime thriller focuses on exciting elements of crimes.",
                    Description: "Police drama about a veteran cop who escorts a rookie cop on his first day with the LAPD tough inner city narcotics unit.",
                },
                {
                    _id: 3,
                    Title: "Equalizer",
                    ImagePath: "https://en.wikipedia.org/wiki/Nomadland_(film)#/media/File:Nomadland_poster.jpeg",
                    Genre: "Action an exciting fast pace film with special effects.",
                    Description: "a man with mysterious origin tries to put his past behind him and live a quiet new life.",
                }

            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    
    render() {
        
            const { movies, selectedMovie } = this.state;

            if (selectedMovie) return <MovieView movie={selectedMovie} />;

            if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

              return (
            <div className="main-view">
                {selectedMovie
                  ? <MovieView movie={selectedMovie} onBackClick= {newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  : movies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} onMovieClick={
                (movie) => { this.setSelectedMovie(movie) }}/>
                  ))
                }  
            </div>
        );
        
    }
}