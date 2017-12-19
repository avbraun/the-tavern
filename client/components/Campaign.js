import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Campaign = (props) => {
  const { campaign, campaignCharacters, availableCharacters, userCharacters, joinCampaign, user } = props

  return (
    <div>
    This is the primary page of a campaign!
    <br />
    Name: {campaign.name}
    <br />
    Version: {campaign.version}
    <br />
    Type: {campaign.type}
    <br />
    DM: {campaign.dm}
    <br />
    Description: {campaign.description}
    <br />
    When last we left our heroes... {campaign.whenLast}
    <br />
    Group loot: {campaign.groupLoot}
    <br />
    Players:
    <br />
    <ul>
      {
        campaignCharacters.length > 0 ?
        campaignCharacters.map(character => {
          return (
            <div>
            <li>{character.user.fullName} as {character.name}</li>
            </div>
          )
        }) : <div>
        No players yet!
        </div>
      }
    </ul>
    Would you like to join this campaign? Select from one of the characters below, or create your own:
    <br />
    <select name="character">
      <option>Select a public character</option>
      {
        availableCharacters.map(character =>
        <option>{character.name} ({character.species}, {character.alignment})</option>)
      }
    </select>
    <button onClick={event => joinCampaign(event, campaign, user)}>Join</button>
    <select name="character">
      <option>Select one of your saved characters</option>
      {
        userCharacters.map(character =>
        <option>{character.name} ({character.species}, {character.alignment})</option>)
      }
    </select>
    <button onClick={event => joinCampaign(event, campaign, user)}>Join</button>
    </div>
  )
}


const mapState = (state, ownProps) => {
  const campaignId = Number(ownProps.match.params.campaignId)

  return {
    user: state.user,
    campaign: state.campaigns.find(campaign => campaign.id === campaignId),
    campaignCharacters: state.characters.filter(character => character.campaignId === campaignId),
    availableCharacters: state.characters.filter(character => !character.userId),
    userCharacters: state.characters.filter(character => character.userId === state.user.id && !character.campaignId)
  }
}

const mapDispatch = (dispatch) => {
  return {
    joinCampaign(event, campaign, user){
      let character = event.target.value
      // console.log('character: ', character)
      dispatch(addUserToCampaign(user, campaign))
      dispatch(addCharacterToCampaign(character, campaign))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Campaign))
