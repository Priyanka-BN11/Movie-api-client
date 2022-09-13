import React from 'react'
function UserInfo({username, email}) {
  return (
    <div> 
        <p>User: {username}</p>
        <p>Email: {email}</p>
    </div>
  )
}
export default UserInfo;