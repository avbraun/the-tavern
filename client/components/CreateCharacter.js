import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postCharacter, fetchCharacters, fetchCampaigns} from '../store'
import history from '../history'

class CreateCharacter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      species: '',
      alignment: '',
      description: '',
      userId: props.match.params.campaignId ? Number(props.user.id) : null,
      campaignId: null || Number(props.match.params.campaignId)
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
    return (
      <div>
      <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/hero_dmgscreen_0.jpg?itok=Iy7FLffb" />
      <h3>Create a New Character</h3>
      {
        this.state.campaignId ?
        <div>Make a character to join {`${this.props.selectedCampaign.name}`}!</div> :
        <div>Dream up a character to add to the public database, or save for your own private use!</div>
      }
      <br />
      <form onSubmit={this.handleSubmit} onChange={this.handleUpdate}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Species:
          <input type="text" name="species" />
        </label>
        <br />
        <label>
          Alignment:
          <select onChange={this.handleUpdate} name="alignment">
            <option>Select an alignment</option>
            <option>Lawful good</option>
            <option>Neutral good</option>
            <option>Chaotic good</option>
            <option>Lawful neutral</option>
            <option>Neutral</option>
            <option>Chaotic neutral</option>
            <option>Lawful evil</option>
            <option>Neutral evil</option>
            <option>Chaotic evil</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        {
          this.state.campaignId ?
          <div /> :
          <div>
          <input type="checkbox" name="userId" value={this.props.user.id} />
            Save to my personal character list.
          </div>
        }
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
    this.props.createCharacter(this.state)
  }
}

const mapState = (state, ownProps) => {
  return {
    user: state.user,
    selectedCampaign: state.campaigns.find(campaign => campaign.id === Number(ownProps.match.params.campaignId))
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    createCharacter (character) {
      dispatch(postCharacter(character))
        .then(() => dispatch(fetchCharacters()))
        .then(() => dispatch(fetchCampaigns()))
        .then(() => ownProps.history.push(`/account/user/${character.userId}`))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreateCharacter))
