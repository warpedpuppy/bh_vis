import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
       // axios.get('https://stormy-taiga-55813.herokuapp.com/movies')
        //.then(response => {
          //  this.setState({
            //    movies: response.data
            //});
        //})
        //.catch(error => {
          //  console.log(error);
        //});
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
            user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        }
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://stormy-taiga-55813.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }
    
    
    render() {
        
            const { movies, selectedMovie,  user } = this.state;

            //if (selectedMovie) return <MovieView movie={selectedMovie} />;

           // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

              return (
            //<div className="main-view">
              //  {selectedMovie
                //  ? (
                <Router>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />
                        <Route path="/register" render={() => {
                            return <Col>
                              <RegistrationView />
                            </Col>
                        }} />
                        <Route path="/movies/:movieId" render={({ match}) => {
                            if (!user) return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        }} />

                    </Row>
                 </Router>
            );
        }
    }
                         //<Col md={8}>
                        //<MovieView movie={selectedMovie} onBackClick= {newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        //</Col>
                    //</Row>
                  //)
                  //: movies.map(movie => (
                  //<MovieCard key={movie._id} movie={movie} onMovieClick={
                //(movie) => { this.setSelectedMovie(movie) }}/>
                 // ))
                //}  
                //<button onClick={() => { this.onLoggedOut()}}>Logout</button>
            //</div>
        //);
        
    //}


//}