import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user, campaigns} = props
  return (
    <div>
      <h3>Welcome, {user.fullName || user.email}. What would you like to do today?</h3>
      <NavLink to={`/campaigns/user/${user.id}`}>Continue a campaign</NavLink><br />
      <NavLink to="/campaigns">Join a new campaign</NavLink><br />
      <NavLink to="/campaigns/new">Start your own campaign</NavLink><br />
      <NavLink to="/characters/new">Create a character</NavLink><br />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    campaigns: state.campaigns,
    user: state.user
  }
}


export default connect(mapState)(UserHome)
