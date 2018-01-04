import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link } from 'react-router-dom'
import {updateCharacter, fetchCharacters, removeCampaign} from '../store'
import history from '../history'

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: Number(props.user.id),
      campaignId: Number(props.match.params.campaignId),
      id: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render() {
    const {campaign, campaignCharacters, availableCharacters, userCharacters, user, userCampaignCharacter, deleteCampaign, leaveCampaign } = this.props

    return (
    <div>
    <img src="http://dnd.wizards.com/sites/default/files/media/styles/second_hubpage_banner/public/images/head-banner/07_NewtoDnD_Hero_Locations.jpg?itok=SxzyekpZ" />
      <h3>{campaign.name}</h3>
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
      <ul>
        {
          campaignCharacters.length > 0 ?
            campaignCharacters.map(character => {
              return (
                <div>
                  <li><Link to={`/users/${character.user.id}`}>{character.user.fullName || ''}</Link> as <Link to={`/characters/${character.id}`}>{character.name || ''}</Link></li>
                </div>
              )
            }) : <div>
              No players yet!
          </div>
        }
      </ul>
      {
        !userCampaignCharacter && campaign.dm !== user.fullName ?
          <div id="join-campaign-container">
            Would you like to join this campaign? Select from one of the public characters below, or create your own!
            <br />
            <br />
            <div id="select-char">
              <div id="public-char">
                <select name="id" onChange={this.handleUpdate}>
                  <option>Select a public character</option>
                  {
                    availableCharacters.map(character =>
                      <option value={character.id}>{character.name} ({character.species}, {character.alignment})</option>)
                  }
                </select>
                <button onClick={this.handleSubmit}>Join</button>
              </div>
              <div id="saved-char">
                <select name="id">
                  <option>Select one of your saved characters</option>
                  {
                    userCharacters.map(character =>
                      <option value={character.id}>{character.name} ({character.species}, {character.alignment})</option>)
                  }
                </select>
                <button onClick={this.handleSubmit}>Join</button>
              </div>
              <div id="create-char">
              <button><Link to={`/characters/new/${campaign.id}`}>Create Your Own</Link></button>
              </div>
            </div>
          </div> :
          <div />
      }
      {
        userCampaignCharacter ?
        <button onClick={() => leaveCampaign(userCampaignCharacter)}>Leave Campaign</button> :
        <div />
      }
      {
        campaign.dm === user.fullName ?
        <div>
          <button><Link to={`/campaigns/${campaign.id}/edit`}>Edit</Link></button>
          <button onClick={() => deleteCampaign(user, campaign)}>Delete</button>
        </div> :
        <div />
      }
    </div>
    )
  }

  handleUpdate (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.joinCampaign(this.state);
    history.push('/campaigns/all')
  }
}


const mapState = (state, ownProps) => {
  const campaignId = Number(ownProps.match.params.campaignId)

  return {
    user: state.user,
    campaign: state.campaigns.find(campaign => campaign.id === campaignId),
    campaignCharacters: state.characters.filter(character => character.campaignId === campaignId),
    availableCharacters: state.characters.filter(character => !character.userId),
    userCharacters: state.characters.filter(character => character.userId === state.user.id && !character.campaignId),
    userCampaignCharacter: state.characters.find(character => character.userId === state.user.id && character.campaignId === campaignId)
  }
}

const mapDispatch = (dispatch, ownProps) => {
  let campaignId = Number(ownProps.match.params.campaignId)
  return {
    joinCampaign(joinObj){
      dispatch(updateCharacter(joinObj))
        .then(() => dispatch(fetchCharacters()))
        .then(() => history.push(`/campaigns/${joinObj.campaignId}`))
    },
    deleteCampaign(user, campaign){
      history.push(`/account/user/${user.id}`)
      dispatch(removeCampaign(campaign))
    },
    leaveCampaign(userCharacter){
      history.push(`/account/user/${userCharacter.userId}`)
      dispatch(updateCharacter({ id: userCharacter.id, campaignId: null }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Campaign))
