import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink } from 'react-router-dom'
import {logout, fetchCampaigns, fetchUsers, fetchCharacters} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, getCampaignsUsersAndChars, currentUser} = props

  return (
    <div>
      <h1>THE TAVERN</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <NavLink to="/" onClick={getCampaignsUsersAndChars}>Home</NavLink>
              <a href="#" onClick={handleClick}>Logout</a>
              <NavLink to={`/users/${currentUser.id}`}>My Profile</NavLink>
              <NavLink to="/users/all">All Users</NavLink>
              <NavLink to={`/campaigns/user/${currentUser.id}`}>My Campaigns</NavLink>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    currentUser: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    getCampaignsUsersAndChars () {
      dispatch(fetchCampaigns())
      dispatch(fetchUsers())
      dispatch(fetchCharacters())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
