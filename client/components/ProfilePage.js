import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ProfilePage = (props) => {
  const { profileUser, characters } = props
  return (
    <div>
    {
      profileUser.id === props.match.params.userId ?
      <h3>My Profile</h3> :
      <h3>User Profile</h3>
    }
    Name: {profileUser.fullName}<br />
    Email: {profileUser.email}<br />
    Bio: {profileUser.bio}<br />
    Proudest DnD Moment: {profileUser.proudestMoment}<br />
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
let id = Number(ownProps.id || ownProps.match.params.userId);
console.log('id: ', id)

  return {
    profileUser: state.allUsers.find(user => user.id === id),
    characters: state.characters.filter(character => character.userId === id && character.campaignId)
  }
}

export default withRouter(connect(mapState)(ProfilePage))
