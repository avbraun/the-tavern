import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import history from '../history'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user, campaigns, createACharacter, startCampaign, joinCampaign, continueCampaign} = props
  return (
    <div className="user-home-welcome">
      <div className="container">
        <img src="https://images.mmorpg.com/images/heroes/news/43513.jpg" />
        <div className="content">
          <h2>Welcome, {user.fullName || user.email}.</h2>
          <p>What would you like to do today?</p>
        </div>
      </div>
      <br />
      <div className="home-button-div">
        <button className="home-button" onClick={event => continueCampaign(event, user)}>Continue a campaign</button>
        <br />
        <br />
        <button className="home-button" onClick={joinCampaign}>Join a campaign</button>
        <br />
        <br />
        <button className="home-button" onClick={startCampaign}>Start a campaign</button>
        <br />
        <br />
        <button className="home-button" onClick={createACharacter}>Create a character</button>
        <br />
      </div>
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

const mapDispatch = (dispatch) => {
  return {
    createACharacter(){
      history.push('/characters/new')
    },
    startCampaign(){
      history.push('/campaigns/new')
    },
    joinCampaign(){
      history.push('/campaigns/all')
    },
    continueCampaign(event, user){
      history.push(`/campaigns/user/${user.id}`)
    }
  }
}


export default connect(mapState, mapDispatch)(UserHome)
