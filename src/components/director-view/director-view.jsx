import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;


        return (
            <Container>
                <Card className="director-view">
                    <Card.Header className="director-view-header">Director</Card.Header>
                    <Card.Body className="director-view-title">
                        <h3>{director.Name}</h3>
                        </Card.Body>
                    <Card.Body>
                        <b>Born:</b><br /> 
                      
                        {director.Born}
                        </Card.Body>
                    <Card.Body>
                        <b>Bio:</b> <br />
                        {director.Bio}
                        </Card.Body>
                    <Card.Footer>
                        <Button
                            className="dir-view-button"
                            onClick={() => {
                                onBackClick();
                            }}
                            >
                                Back
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        );
    }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
  }).isRequired,
};