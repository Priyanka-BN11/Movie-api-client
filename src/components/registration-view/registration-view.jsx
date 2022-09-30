import React, {useState} from 'react';
import axios from 'axios';
import { Form, Button, Container, CardGroup, Card, Row, Col, Navbar, Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link }  from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    
    //Declare hook for eact input
    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: ''
    });

    //validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username) {
            setValues({...values,usernameErr:'Username is required'});
            isReq=false;
        }
        else if(username.length < 2){
            setValues({...values, usernameErr: 'Username must be 2 characters long'});
            isReq = false;
        }
        if(!password){
            setValues({...values, passwordErr:'Password Required'});
            isReq=false;
        }
        else if(password.length < 6){
            setValues({...values, passwordErr: 'Password must be atleast 6 characters long' });
            isReq=false;
        }
        if(!email){
            setValues({...values, emailErr:'Email Required'});
            isReq=false;
        }
        else if(email.indexOf('@') === -1){
          setValues({...values, emailErr: 'Email is invalid'});
          isReq=false;  
        }
        return isReq;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios.post('https://movie-app-priya.herokuapp.com/users',{
                // Name: name,
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday    
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('Registration successful,Please login')
                // The second argument '_self' is neccessary so that
                // the page will open in the current tab
                window.open('/', '_self');
    
            })
            .catch(response => {
                console.error(response);
                alert('unable to register');
            });
            
            console.log(username, password, email, birthday);
        }
       
      };
        return(
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xl={6}>
                        <CardGroup>
                            <Card>
                                <Card.Body>
                                <Card.Title>Registration page</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type = "text" value ={username} onChange={e => setUsername(e.target.value)} required 
                                        placeholder="Enter Username"/>
                                        {values.usernameErr && <p>{values.usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required 
                                            placeholder="Enter password"/>
                                            {values.passwordErr && <p>{values.passwordErr}</p>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type = "email" value ={email} onChange={e => setEmail(e.target.value)} required 
                                            placeholder="Enter Email"/>
                                            {values.emailErr && <p>{values.emailErr}</p>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type = "date" value ={birthday} onChange={e => setBirthday(e.target.value)} required 
                                            placeholder="Enter Date of Birth"/>
                                            {values.birthdayErr && <p>{values.birthdayErr}</p>}
                                    </Form.Group>
                                    <Button type="submit" className="register-register"
                                    variant="success" onClick={handleSubmit}>Register</Button>
                                    <p></p>
                                    <div>
                                     <Link to ={'/'}>Sign in</Link>
                                     </div>
                                </Form>
                                </Card.Body>
                            </Card>  
                        </CardGroup>
                    </Col>
                </Row>
                </Container>
        )
    }
    RegistrationView.propTypes = {
        register: PropTypes.shape({
            Username: PropTypes.string.isRequired,
            Password: PropTypes.string.isRequired,
            Email: PropTypes.string.isRequired,
            Birthday: PropTypes.string.isRequired
        }),
        onRegistration: PropTypes.func.isRequired,
      };
