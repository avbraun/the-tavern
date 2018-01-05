import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
          <div key={`campaign-dm-${campaign.id}`}>
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
          <div key={`campaign-player-${filteredCharacter.id}`}>
           <Link to={`/campaigns/${filteredCharacter.campaignId}`}>
           {filteredCharacter.campaign.name}</Link>   (<Link to={`/characters/${filteredCharacter.id}`}>{filteredCharacter.name}</Link> the {filteredCharacter.species}, {filteredCharacter.alignment})
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
          <div key={`saved-chars-${filteredCharacter.id}`}>
           <Link to={`/characters/${filteredCharacter.id}`}>{filteredCharacter.name}</Link> the {filteredCharacter.species} ({filteredCharacter.alignment})
          </div>
        )
        : <div>
        You do not currently have any saved characters. Would you like to <Link to="/characters/new">create one</Link>?
        </div>
      }
    <br />
    Eager for more adventure? Join a campaign or create one of your own!
    <br />
    <br />
    <button><Link to="/campaigns/new">Create Campaign</Link></button>
    <button><Link to="/campaigns/all">Join Campaign</Link></button>
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

export default connect(mapState)(AccountPage)
