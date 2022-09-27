import React from 'react';
import { connect } from 'react-redux';

import {Form, Row, Col} from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Row>
        <Col>
			<Form.Control
			onChange={(e) => props.setFilter(e.target.value)}
			value={props.visibilityFilter}
			placeholder="Search movie"
        	/>
        </Col>
  </Row>
  );
  
}

export default connect(null,{ setFilter })(VisibilityFilterInput);