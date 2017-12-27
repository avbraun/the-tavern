import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ProfilePage = (props) => {
  const { profileUser, characters, user } = props
  const profileId = Number(props.match.params.userId)
  return (
    <div>
    {
      profileId === user.id ?
      <h3>My Profile</h3> :
      <h3>User Profile: {profileUser.fullName}</h3>
    }
    NAME<br />
    {profileUser.fullName}<br />
    <br />
    EMAIL<br />
    {profileUser.email}<br />
    <br />
    BIO<br />
    {profileUser.bio}<br />
    <br />
    PROUDEST DND MOMENT<br />
    {profileUser.proudestMoment}<br />
    <br />
    CAMPAIGNS
    <ul>
    {
      characters.map(character =>
        <div>
        <li><Link to={`/campaigns/${character.campaignId}`}>{character.campaign.name}</Link> as {character.name} ({character.species}, {character.alignment})</li>
        </div>
      )
    }
    </ul>
    <br />
    <br />
    {
      profileId === user.id ?
      <button>Edit</button> :
      <div />
    }
    </div>
  )
}


const mapState = (state, ownProps) => {
let id = Number(ownProps.id || ownProps.match.params.userId);

  return {
    user: state.user,
    profileUser: state.allUsers.find(user => user.id === id),
    characters: state.characters.filter(character => character.userId === id && character.campaignId)
  }
}

export default withRouter(connect(mapState)(ProfilePage))
