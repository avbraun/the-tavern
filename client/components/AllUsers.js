import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AllUsers = (props) => {
  const {user, allUsers} = props

  return (
    <div>
      <img src="http://dnd.wizards.com/sites/default/files/media/styles/second_hubpage_banner/public/images/head-banner/03_NEW-TO-DnD_Races_Heroes_Hero_140725.jpg?itok=Lv71J5AL" />
      <h2>Meet the Community</h2>
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
