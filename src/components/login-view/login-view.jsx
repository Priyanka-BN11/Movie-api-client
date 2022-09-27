import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Container, CardGroup, Row, Col, Card, Nav, Navbar } from 'react-bootstrap';
// import { RegistrationView } from '../registration-view/registration-view';
import './login-view.scss';
export function LoginView(props){
    const [username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
	// Declare hook for each input
	const [ usernameErr, setUsernameErr ] = useState('');
	const [ passwordErr, setPasswordErr ] = useState('');

	//Validate user inputs
	const validate = () => {
		let isReq = true;
		if(!username) {
			setUsernameErr('Username Required');
			isReq = false;
		}
		else if(username.length < 2){
			setUsernameErr('Username must be 2 characters long');
			isReq = false;
		}
		if(!password){
			setPasswordErr('Password Required');
			isReq = false;
		}
		else if(password.length > 6){
			setPassword('Password must be 6 characters long');
			isReq=false;
		}
		return isReq;
	}


    const handleSubmit = (e) => {
      e.preventDefault();
      //send a request to the server for authentication
	  const isReq = validate();
	  if(isReq){
		axios.post('https://movie-app-priya.herokuapp.com/login',{},{
			params:{
			Username:username,
			Password:password}
		  })
		  .then(response => {
			const data = response.data;
			props.onLoggedIn(data);
		  })
		  .catch(e => {
			console.log(e,'no such user');
		  });
	  }
     };
	
    return (
		<Container fluid>
			<Container>
			<Row className="main-view justify-content-md-center">
				<Col xl={6}>
					<CardGroup>
						<Card>
							<Card.Body>
								<Card.Title>Login Page</Card.Title>
								<Form>
									<Form.Group controlId="formUsername">
										<Form.Label>Username:</Form.Label>
										<Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} 
										placeholder="Enter Username"/>
										{/* code added here to display validation error */}
										{usernameErr && <p>{usernameErr}</p>}
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password:</Form.Label>
										<Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}
										placeholder="Enter password" minLength="8"/>
										        {/* code added here to display validation error */}
												{passwordErr && <p>{passwordErr}</p>}
									</Form.Group>
									<Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>{' '}
									<Link to=""><Button variant ="primary">
										Register</Button></Link>
								</Form>
							</Card.Body>

						</Card>
					</CardGroup>
				</Col>
			</Row>
			</Container>
		</Container>
      
    );
  }
 
