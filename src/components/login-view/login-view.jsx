import React, {useState} from 'react';
import { Form, Button, Container, CardGroup, Row, Col, Card, Nav, Navbar } from 'react-bootstrap';
// import { RegistrationView } from '../registration-view/registration-view';
export function LoginView(props){
    const [username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
      /* Send a request to the server for authentication */
      /* then call props.onLoggedIn(username) */
       props.onLoggedIn(username);
    };
	const handleRegister = (e) => {
		e.preventDefault();
		console.log(username,password,email,birthday);
		props.RegistrationView(username);
	}
  
    return (
		
		<Container fluid>
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
            <Nav.Link href="#action1">Profile</Nav.Link>
            <Nav.Link href="#action2">Update Profile</Nav.Link>
			<Nav.Link href="#action3">Logout</Nav.Link>
			</Nav>
			</Navbar.Collapse>
			</Container>
			</Navbar>
			<br/>
            <br/>
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
										<Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required 
										placeholder="Enter Username"/>
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password:</Form.Label>
										<Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required 
										placeholder="Enter password" minlength="8"/>
									</Form.Group>
									<Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>{' '}
									<Button variant ="primary" onClick={handleRegister}>Register</Button>
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
