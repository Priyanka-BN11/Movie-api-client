import React,{ useState, useEffect} from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovie from './favorite-movie';
import UserUpdate from './user-update';
import {Container, Row, Col} from 'react-bootstrap';

    export function ProfileView(props){

    const [user, setUser] = useState(props.user);
    const [ movies, setMovies ] = useState(props.movies);

    const [ favouriteMovies, setFavouriteMovies ] = useState([]);
    // const [username, setUsername]=useState(props.username);
    
    const[ email, setEmail]=useState('');
    const[ birthday, setBirthday]= useState('');

  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

    //  const favoriteMovieList = movies.filter(( movies) => {
    //     return user.FavoriteMovie.includes(movies._id);
    //  });

    const getUser = () => {
        axios.get(`https://movie-app-priya.herokuapp.com/users/${Username}`,{
           headers: {'Authorization': `Bearer ${token}`} 
        })
        .then(response => {
            //Assign the result to the state
            console.log(response.data,"in the api",typeof response.data)

            setUser(response.data);
            setFavouriteMovies(response.data.FavoriteMovies)
        })
        .catch(error =>  console.log(error))
           
   
    }
    const handleSubmit = (e) => {
        

    };
    const removeFav = (id) => {

    };


    const handleUpdate = (e) => {
  
        axios.put(`https://movie-app-priya.herokuapp.com/users/${Username}`,
        {
            Username: user.Username,
            Password: user.Password,
            Email:user.Email,
            Birthday:user.Birthday,
        },
        {
            headers: {Authorization : `Bearer ${token}`},
        }
        )
        .then((response) => {
            {
                // setUserame(response.data.Username),
                //  setPassword(response.data.Password),
                setEmail(response.data.Email),
                setBirthday(response.data.Birthday)
            }
            localStorage.setItem("user",this.state.Username);
            const data=response.data;
            console.log(data);
            console.log(this.state.Username);
            alert("Profile is updated!");
            window.open(`/users/${Username}`, "_self");
        })
        .catch(function(error){
            console.log(error);
        });

    };
    useEffect(() => {
        getUser();
    },[])

    return (
        <Container>
            <Row>
                <Col>
                    <UserInfo username={user.Username} email={user.Email}/>
                </Col>
                <Col>
                    <FavoriteMovie  movies={movies} favouriteMovies={favouriteMovies} />
                </Col>
                <Col>
                    <UserUpdate  user={user} />
                </Col>
            </Row>
        </Container>
    )
}
    