import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {postCampaign} from '../store'
import history from '../history'

class CreateCampaign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      version: '',
      type: '',
      dm: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
    return (
      <div>
      Create a new campaign!
      <br />
      <br />
      <form onSubmit={this.handleSubmit} onChange={this.handleUpdate}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Version:
          <select onChange={this.handleUpdate} name="version">
            <option value="Select a version">Select a version</option>
            <option value="Pathfinder">Pathfinder</option>
            <option value="3rd edition">3rd edition</option>
            <option value="4th edition">4th edition</option>
            <option value="5th edition">5th edition</option>
          </select>
        </label>
        <br />
        <label>
          Type:
          <select onChange={this.handleUpdate} name="type">
            <option value="Select a type">Select a type</option>
            <option>in-person</option>
            <option>online</option>
            <option>hybrid</option>
          </select>
        </label>
        <br />
        <label>
          Dungeon Master:
          <input type="text" name="dm" />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }

  handleUpdate (event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log('state: ', this.state)
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createCampaign(this.state)
    history.push('/campaigns/all')
  }
}

const mapState = (state, ownProps) => {
  // const campaignId = Number(ownProps.match.params.campaignId)

  return {
  //   campaign: state.campaigns.find(campaign => campaign.id === campaignId),
  //   characters: state.characters.filter(character => character.campaignId === campaignId)
  }
}

const mapDispatch = (dispatch) => {
  return {
    createCampaign: (campaign) => dispatch(postCampaign(campaign))
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreateCampaign))
