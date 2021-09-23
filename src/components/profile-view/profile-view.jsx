import React from 'react';
import axios from 'axios';
import  PropTypes  from 'prop-types';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';


export class ProfileView extends React.Component {
    constructor(){
        super();

        this.state = {
            username: null,
            password: null,
            email: null,
            birthdate: null,
            FavoriteMovies: [],
        }
    }
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    
    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://stormy-taiga-55813.herokuap.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    Name: response.data.Name,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthdate: response.data.Birthdate,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
        removeFavoriteMovie(movie) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('user');

            axios.delete(`https://stormy-taiga-55813.herokuap.com/users/${username}/favorites/${movie._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert(movie.Title + ' Movie has been removed');
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            })
        }

        handleDeleteUser(e) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('user');

            axios.delete(`https://stormy-taiga-55813.herokuap.com/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                alert('Your account has been deleted');
            })
            .catch((e) => {
                console.log(e);
            });
        }

        render() {
            const { movies, user } = this.props;

            const favoriteList = movies.filter(m => {
                return this.state.Favorites.includes(m._id);
            });

        
           
            return (
                <Container className="profile-wrapper">
                    <Row>
                        <Col>
                            <h2>Username: {`${this.props.user}`}</h2>
                            <p>Email: {`${this.state.Email}`}</p>
                            <p>Birthday: {`${this.state.Birthday}`}</p>
                            <h4>Hits</h4>
                        </Col>
                    </Row>

                    <Row>
                       {favoritesList.map((movie) => {
                          return (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={movie.ImageUrl} />
                                        <Card.Body>
                                        <Link to={`/movies/${movie.Title}`}>
                                        <Card.Img variant="top" src={movie.imageUrl} />
                                        <Card.Title>{movie.Title}</Card.Title>
                                        </Link>
                            <Button className='remove favorite' value={movie._id} onClick={() => this.removeFavoriteMovie(movie)}>
                                Remove
                            </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            );
                          })
                        }
                    </Row>
          </Container>
        );
    }
}
