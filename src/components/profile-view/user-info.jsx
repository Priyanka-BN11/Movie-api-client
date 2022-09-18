import React from 'react'
import { Card } from 'react-bootstrap';
function UserInfo({username, email}) {
  return (
    <Card>
      <Card.Header>User Info</Card.Header>
      <Card.Body>
      <p>User: {username}</p>
        <p>Email: {email}</p>
      </Card.Body>
       
        </Card> 
  )
}
export default UserInfo;