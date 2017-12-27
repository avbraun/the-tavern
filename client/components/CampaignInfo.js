import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateCharacter, updateCampaign} from '../store'
import history from '../history'

class CampaignInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.user.id,
      campaignId: props.campaign.id,
      id: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render() {
    const {campaign, campaignCharacters, availableCharacters, userCharacters, joinCampaign, user } = this.props

    return (
    <div>
    <br />
    <br />
      This is the primary page of a campaign!
      {/*<br />
      <h2>{campaign.name}</h2>
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
      HERE IS WHERE A SOCKET.IO DICE MIGHT GO!!!
      <br />
      <br />
      Would you like to join this campaign? Select from one of the characters below, or create your own:
      <br />
      <select name="id" onChange={this.handleUpdate}>
        <option>Select a public character</option>
        {
          availableCharacters.map(character =>
            <option value={character.id}>{character.name} ({character.species}, {character.alignment})</option>)
        }
      </select>
      <button onClick={this.handleSubmit}>Join</button>
      <br />

      <select name="id">
        <option>Select one of your saved characters</option>
        {
          userCharacters.map(character =>
            <option value={character.id}>{character.name} ({character.species}, {character.alignment})</option>)
        }
      </select>
      <button onClick={event => joinCampaign(event, campaign, user)}>Join</button>*/}
    </div>
    )
  }

  // componentDidMount () {

  // }

  handleUpdate (event) {
    console.log('prev state: ', this.state)
    this.setState({ [event.target.name]: event.target.value })
    console.log('state: ', this.state)
    console.log('event.target.value: ', event.target.value)
  }

  handleSubmit (event) {
    console.log('submit state: ', this.state)
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
    userCharacters: state.characters.filter(character => character.userId === state.user.id && !character.campaignId)
  }
}

const mapDispatch = (dispatch) => {
  return {
    joinCampaign(joinObj){
      console.log('characterObj: ', joinObj)
      dispatch(updateCharacter(joinObj))
      dispatch(updateCampaign(joinObj))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CampaignInfo))
