import React,{useState} from 'react';
import {Button } from 'react-bootstrap';
import axios from 'axios';
function UserUpdate( props) {
  const { user } = props;
  const [ username, setUsername] = useState("");
  const [ password, setPassword] = useState('');
  const [ email, setEmail] = useState('');
  const [ birthday, setBirthday] = useState('');
  const [ values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // validate user inputs
  const validate =() => {
    let isReq = true;
    if (!username) {
      setValues({...values, usernameErr: 'Username required'});
      isReq = false;
    } else if (username.length < 2) {
      setValues({...values, usernameErr: 'Username must be at least 2 characters long'});
      isReq= false;
    }
    if (!password) {
      setValues({...values, passwordErr: 'Password required'});
      isReq = false;
    } else if (password.length < 6) {
      setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
      isReq= false;
    }
    if (!email) {
      setValues({...values, emailErr: 'Email required'});
      isReq = false;
    } else if (email.includes('@') === -1) {
      setValues({...values, emailErr: 'Enter valid email'});
      isReq = false;
    }
    return isReq;
  }

    handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();   
     console.log(username,password,email,"user should be updated",isReq)

    if (isReq) {
      const token = localStorage.getItem('token');
      axios.put(`https://movie-app-priya.herokuapp.com/users/${user.Username}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log(response.data);
        alert('Profile was successfully updated.');
        localStorage.setItem("user",username)
        window.open(`/users/${username}`, '_self');
      })
      .catch(error => {
        console.error(error);
        alert('Unable to update profile.');
      });
    }
  };  
  return (
    <div className='profile-form'>
                <h2>Want to change some info?</h2>
                <label>Username:</label>
                {values.usernameErr && <p>{values.usernameErr}</p>}

                <input 
                type='text'
                name='Username'
               
                onChange={e =>setUsername(e.target.value)}/>
                <label>Password</label>
                {values.passwordErr && <p>{values.passwordErr}</p>}

                <input 
                type='password'
                name='password'
              
                onChange={e => setPassword(e.target.value)}/>
                <label>Email address</label>
                {values.emailErr && <p>{values.emailErr}</p>}
                <input 
                type='email'
                name='email'
                
onChange={e => setEmail(e.target.value)}
                />
                <label>Birthday</label>
                <input 
                type="date" name="birthday"
                
                onChange={e => setBirthday(e.target.value)}
                />
                <button onClick={(e)=>handleUpdate(e)}>Save</button> 
            </div>
  )
}
export default UserUpdate;