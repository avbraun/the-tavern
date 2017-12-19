import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {postCharacter} from '../store'
import history from '../history'

class CreateCharacter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      species: '',
      alignment: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
    return (
      <div>
      Create a new character!
      <br />
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
    this.props.createCharacter(this.state)
    // history.push('/characters/all')
  }
}

const mapState = (state, ownProps) => {
  // const campaignId = Number(ownProps.match.params.campaignId)
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    createCharacter (character) {
      dispatch(postCharacter(character))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreateCharacter))
