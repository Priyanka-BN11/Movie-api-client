import React,{ useState, useEffect} from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovie from './favorite-movie';
import UserUpdate from './user-update';
import FavoriteMovie from './favorite-movie';
import {Container, Row, Col} from 'react-bootstrap';
export function ProfileView({movies}){
    const [user, setUser] = useState({
        Username: '',
        Email:'',
        FavoriteMovie: []
    })
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

     const favoriteMovieList = movies.filter(( movies) => {
        return user.FavoriteMovie.includes(movies._id);
     });
    const getUser = () => {
        axios.get(`https://movie-app-priya.herokuapp.com/users/${Username}`,{
           headers: {'Authorization': `Bearer ${token}`} 
        })
        .then(response => {
            //Assign the result to the state
            setUser(response.data);
            setFavouriteMovie(response.data.FavouriteMovie)
        })
        .catch(error =>  console.log(error))
           
   
    }
    const handleSubmit = (e) => {

    };
    // const removeFav = (id) => {

    // };


    const handleUpdate = (e) => {
  
        axios.put(`https://movie-app-priya.herokuapp.com/users/${Username}`,
        {
            Username: this.state.Username,
            Password: this.state.Password,
            Email:this.state.Email,
            Birthday:this.state.Birthday,
        },
        {
            headers: {Authorization : `Bearer ${token}`},
        }
        )
        .then((response) => {
            this.setState({
                Username:response.data.Username,
                Password:response.data.Password,
                Email:response.data.Email,
                Birthday:response.data.Birthday,
            });
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
        let isMounted = true;
        isMounted && getUser();
        return() => {
            isMounted= false;
        }
    },[])


    return (
        <Container>
            <Row>
                <Col>
                    <UserInfo username={user.Username} email={user.Email}/>
                </Col>
                <Col>
                    <FavoriteMovie favoriteMovieList={favoriteMovieList} />
                </Col>
                <Col>
                    <UserUpdate user={user} setUser={setUser}/>
                </Col>
            </Row>
        </Container>
    )
}
    