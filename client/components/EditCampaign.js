import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link } from 'react-router-dom'
import {updateCampaign, fetchCharacters, fetchCampaigns} from '../store'
import history from '../history'

class EditCampaign extends React.Component {
  constructor(props) {
    super(props);
    let campaignId = Number(props.campaign.id);
    this.state = {
      id: campaignId,
      version: props.campaign.version,
      type: props.campaign.type,
      dm: props.campaign.dm,
      description: props.campaign.description,
      whenLast: props.campaign.whenLast,
      groupLoot: props.campaign.groupLoot
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render() {
    const {campaign} = this.props

    return (
    <div>
    <img src="http://dnd.wizards.com/sites/default/files/media/styles/second_hubpage_banner/public/images/head-banner/07_NewtoDnD_Hero_Locations.jpg?itok=SxzyekpZ" />
      <h3>Edit {campaign.name}</h3>
      <form onChange={this.handleUpdate} onSubmit={this.handleSubmit}>
      <label>
      Version:
        <select defaultValue={campaign.version} onChange={this.handleUpdate} name="version">
          <option>Pathfinder</option>
          <option>3rd edition</option>
          <option>4th edition</option>
          <option>5th edition</option>
        </select>
      </label>
      <br />
      <label>
      Type:
        <select defaultValue={campaign.type} onChange={this.handleUpdate} name="type">
          <option>in-person</option>
          <option>online</option>
          <option>hybrid</option>
        </select>
      </label>
      <br />
      <label>
      DM:
        <input type="text" name="dm" defaultValue={campaign.dm} />
      </label>
      <br />
      <label>
      Description:
        <input type="text" name="description" defaultValue={campaign.description} />
      </label>
      <br />
      <label>
      When last we left our heroes...
        <input type="text" name="whenLast" defaultValue={campaign.whenLast} />
      </label>
      <br />
      <label>
      Group loot:
        <input type="text" name="groupLoot" defaultValue={campaign.groupLoot} />
      </label>
      <br />
      <input type="submit" name="Submit" />
      </form>
    </div>
    )
  }

  handleUpdate (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.updateCampaign(this.state);
    history.push(`/users/${this.props.user.id}`)
  }
}


const mapState = (state, ownProps) => {
  const campaignId = Number(ownProps.match.params.campaignId)

  return {
    user: state.user,
    campaign: state.campaigns.find(campaign => campaign.id === campaignId),
    campaignCharacters: state.characters.filter(character => character.campaignId === campaignId)
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateCampaign(campaign){
      dispatch(updateCampaign(campaign))
        .then(() => {
          dispatch(fetchCharacters())
          dispatch(fetchCampaigns())
        })
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditCampaign))
