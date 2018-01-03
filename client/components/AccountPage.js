import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'

/**
 * COMPONENT
 */
export const AccountPage = (props) => {
  const { userCharacters, userDmCampaigns, createCampaign, joinCampaign, savedCharacters } = props
  return (
    <div>
      <img src="http://dnd.wizards.com/sites/default/files/media/styles/second_hubpage_banner/public/images/head-banner/07_NewtoDnD_Hero_Locations.jpg?itok=SxzyekpZ" />
      <h3>My Account</h3>
      <h4>Campaigns as Dungeon Master:</h4>
      {
        userDmCampaigns.length ?
          userDmCampaigns.map(campaign =>
          <div>
           <Link to={`/campaigns/${campaign.id}`}>
           {campaign.name}</Link>
          </div>
        )
        : <div>
        You are not currently leading any campaigns.
        </div>
      }
      <h4>Campaigns as Player:</h4>
      {
        userCharacters.length ?
          userCharacters.map(filteredCharacter =>
          <div>
           <Link to={`/campaigns/${filteredCharacter.campaignId}`}>
           {filteredCharacter.campaign.name}</Link>   ({filteredCharacter.name} the {filteredCharacter.species}, {filteredCharacter.alignment})
          </div>
        )
        : <div>
        You are not currently on any campaigns.
        </div>
      }
      <h4>Saved Characters:</h4>
      {
        savedCharacters.length ?
          savedCharacters.map(filteredCharacter =>
          <div>
           {filteredCharacter.name} the {filteredCharacter.species} ({filteredCharacter.alignment})
          </div>
        )
        : <div>
        You are not currently on any campaigns.
        </div>
      }
    <br />
    Eager for more adventure? Join a campaign or create one of your own!
    <br />
    <br />
    <button onClick={createCampaign}>Create Campaign</button>
    <button onClick={joinCampaign}>Join Campaign</button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    campaigns: state.campaigns,
    userCharacters: state.characters.filter(character => character.userId === state.user.id && character.campaignId),
    userDmCampaigns: state.campaigns.filter(campaign => campaign.dm === state.user.fullName),
    savedCharacters: state.characters.filter(character => character.userId === state.user.id && !character.campaignId)
  }
}

const mapDispatch = (dispatch) => {
  return {
    createCampaign () {
      history.push('/campaigns/new')
    },
    joinCampaign () {
      history.push('/campaigns/all')
    }
  }
}

export default connect(mapState, mapDispatch)(AccountPage)
