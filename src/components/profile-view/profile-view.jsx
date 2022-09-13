import React from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovie from './favorite-movie';
import UserUpdate from './user-update';
import { useEffect } from 'react';
export function ProfileView(props){
    const [user, setUser] = useState(props.user);
    const [ movies, setMovies ] = useState(props.movies);
  const [ favouriteMovies, setFavouriteMovies ] = useState([]);
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
     
    const getUser = () => {
        axios.get(`https://movie-app-priya.herokuapp.com/users/${Username}`,{
           headers: {'Authorization': `Bearer ${token}`} 
        })
        .then(response => {
            //Assign the result to the state
            setUser(response.data);
            setFavouriteMovies(response.data.FavouriteMovies)
        })
        .catch(error =>  console.log(error))
           
   
    }
    const handleSubmit = (e) => {

    }
    const removeFav = (id) => {

    };
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
        getUser();
    },[])


    return (
        <div>
           <UserInfo username={user.Username} email={user.Email}/>
            <FavoriteMovie favoriteMovieList={favoriteMovieList} />
            <UserUpdate handleSubmit={handleSubmit} handleUpdate={handleUpdate}/>
        </div>
    )
}
    