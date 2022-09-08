import React, {useState} from 'react';
import PropTypes from "prop-types";
import { Form, Button, Container, CardGroup, Card, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';
export function RegistrationView(props){
    const [username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://movie-app-priya.herokuapp.com/users',{
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday    
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            // The second argument '_self' is neccessary so that
            // the page will open in the current tab
            window.open('/', '_self');

        })
        .catch((e) => {
            console.log('error registering the user');
            alert('Something was not entered right');
        });
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
         props.RegistrationView(username);
      };
        return(
           <Container fluid >
                <Navbar className = "blue" expand="lg" fixed="top">
                     <Container fluid>
			<Navbar.Brand href="#">Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Login</Nav.Link>
			</Nav>
			</Navbar.Collapse>
            </Container>
			</Navbar>
            <br/>
            <br/>
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
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required 
                                            placeholder="Enter password" minlength="8"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type = "email" value ={email} onChange={e => setEmail(e.target.value)} required 
                                            placeholder="Enter Email"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type = "date" value ={birthday} onChange={e => setBirthday(e.target.value)} required 
                                            placeholder="Enter Date of Birth"/>
                                    </Form.Group>
                                    <Button type="submit" onClick={handleSubmit}>Register</Button>
                                </Form>
                                </Card.Body>
                            </Card>  
                        </CardGroup>
                    </Col>
                </Row>
                </Container>
                </Container>
        )
    }
    RegistrationView.propTypes = {
        onRegistration: PropTypes.func.isRequired,
      };
