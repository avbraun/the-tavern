import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AllUsers = (props) => {
  const {user, allUsers} = props

  return (
    <div>
      <h3>Meet the community!</h3>
      {
        allUsers.map(singleUser =>
          <div>
          <Link
            key={singleUser.id}
            to={`/users/${singleUser.id}`}>
          {singleUser.fullName}
          </Link>
          <br />
          </div>)
        }
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers.filter(user => user.id !== state.user.id)
  }
}


export default connect(mapState)(AllUsers)
