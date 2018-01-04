import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postCharacter} from '../store'
import history from '../history'

class CreateCharacter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      species: '',
      alignment: '',
      description: '',
      userId: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  render () {
    return (
      <div>
      <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/hero_dmgscreen_0.jpg?itok=Iy7FLffb" />
      <h2>Create a New Character</h2>
      Dream up a character to add to the public database, or save for your own private use!
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
        <input type="checkbox" name="userId" value={this.props.user.id} onClick={this.handleChange} />
          Save to my personal character list.
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
    this.props.createCharacter(this.state)
    history.push(`/users/${this.props.user.id}`)
  }

  handleCheckbox () {
    this.setState({ userId: this.props.user.id })
  }
}

const mapState = (state) => {
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
