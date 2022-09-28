import React, {useState} from 'react';
import axios from 'axios';
import {Button, Card, Form } from 'react-bootstrap';
function UserUpdate(props) {
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

    const handleUpdate = (e) => {
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
    <Card>
      <Card.Header>Update User Info</Card.Header>
    <Form className='profile-form'>
                
                <Form.Label>Username:</Form.Label>
                {values.usernameErr && <p>{values.usernameErr}</p>}

                <Form.Control 
                type='text'
                name='Username'
                defaultValue={user.Username}
                onChange={e => setUsername(e.target.value)}/>

                {/* <Form.Label>Password</Form.Label>
                {values.passwordErr && <p>{values.passwordErr}</p>}
                <Form.Control 
                type='password'
                name='password'
                placeholder="Enter New Pasword"
                onChange={e => setPassword(e.target.value)}/> */}

                <Form.Label>Email address</Form.Label>
                {values.emailErr && <p>{values.emailErr}</p>}
                <Form.Control 
                type='email'
                name='email'
                defaultValue={user.Email}
                placeholder="Enter New Email"
                onChange={e => setEmail(e.target.value)}
                />
               <br/>
                <Button varianr="primary" onClick={(e) => handleUpdate(e)}>Save</Button> 
            </Form>
            </Card>
  )
}
export default UserUpdate;