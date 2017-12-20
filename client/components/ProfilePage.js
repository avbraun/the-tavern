import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ProfilePage = (props) => {
  const { user, characters } = props

  return (
    <div>
    This is a profile page!<br />
    Name: {user.fullName}<br />
    Email: {user.email}<br />
    Bio: {user.bio}<br />
    Proudest DnD Moment: {user.proudestMoment}<br />
    Campaigns:
    {
      characters.map(character =>
        <div>
        <Link to={`/campaigns/${character.campaignId}`}>{character.campaign.name}</Link> as {character.name} ({character.species}, {character.alignment})<br />
        </div>
      )
    }
    <br />
    <br />
    </div>
  )
}


const mapState = (state, ownProps) => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    characters: state.characters.filter(character => character.userId === state.user.id && character.campaignId)
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default withRouter(connect(mapState, mapDispatch)(ProfilePage))
