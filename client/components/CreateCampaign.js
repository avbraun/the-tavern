import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postCampaign} from '../store'
import history from '../history'

class CreateCampaign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      version: '',
      type: '',
      dm: props.user.fullName,
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
    return (
      <div>
      <img src="http://dnd.wizards.com/sites/default/files/media/styles/second_hubpage_banner/public/images/head-banner/07_NewtoDnD_Hero_Locations.jpg?itok=SxzyekpZ" />
      <h3>Create a New Campaign</h3>
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
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createCampaign(this.state)
    history.push(`/account/user/${this.props.user.id}`)
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    createCampaign: (campaign) => dispatch(postCampaign(campaign))
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreateCampaign))
