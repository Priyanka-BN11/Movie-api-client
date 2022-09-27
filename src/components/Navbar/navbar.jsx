import React from "react";
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
export function NavBar({user}){
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.open("/", "_self");
    }
    const isAuth = () => {
        if(typeof window == "undefined"){
            return false;
        }
        if(localStorage.getItem("token")){
            return localStorage.getItem("token");
        }
        else {
            return false;
        }
    };
    return (
        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">MovieApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            // <Link to={`/users/${user}`}> {user}</Link>
                            <Nav.Link href={`/users/${user}`}>
                               {user}
                            </Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={(e) =>
                            {handleLogOut(e)}}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}