import React from 'react';
import {Button } from 'react-bootstrap';
function UserUpdate({handleSubmit, handleUpdate, user}) {
  
  return (
    <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
                <h2>Want to change some info?</h2>
                <label>Username:</label>
                <input 
                type='text'
                name='Username'
                defaultValue={user.Username}
                onChange={e => handleUpdate(e)}/>
                <label>Password</label>
                <input 
                type='password'
                name='password'
                defaultValue={user.Password}
                onChange={e => handleUpdate(e)}/>
                <label>Email address</label>
                <input 
                type='email'
                name='email'/>
                <label>Birthday</label>
                <input 
                type="date" name="birthday"
                defaultValue={user.Birthday}
                onChange={e => handleUpdate(e)}/>
                <Button varianr="primary" onClick={handleUpdate()}>Save</Button> 
            </form>
  )
}
export default UserUpdate;