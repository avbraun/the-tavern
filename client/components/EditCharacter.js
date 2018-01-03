import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link } from 'react-router-dom'
import {updateCharacter, fetchCharacters, fetchCampaigns} from '../store'
import history from '../history'

class EditCharacter extends React.Component {
  constructor(props) {
    super(props);
    let characterId = Number(props.character.id);
    this.state = {
      id: characterId,
      name: props.character.name,
      species: props.character.species,
      alignment: props.character.alignment,
      description: props.character.description
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render() {
    const { character } = this.props

    return (
    <div>
    <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/hero_dmgscreen_0.jpg?itok=Iy7FLffb" />
      <h3>Edit {character.name}</h3>
      <form onChange={this.handleUpdate} onSubmit={this.handleSubmit}>
      <label>
      Name:
        <input type="text" name="name" defaultValue={character.name} />
      </label>
      <br />
      <label>
      Species:
        <input type="text" name="species" defaultValue={character.species} />
      </label>
      <br />
      <label>
      Alignment:
        <select name="alignment" defaultValue={character.alignment}>
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
        <input type="text" name="description" defaultValue={character.description} />
      </label>
      <br />
      <input type="submit" name="Submit" />
      </form>
    </div>
    )
  }

  handleUpdate (event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log('this.state: ', this.state)
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log('this.state: ', this.state)
    this.props.updateCharacter(this.state);
    history.push(`/account/user/${this.props.user.id}`)
  }
}


const mapState = (state, ownProps) => {
  const characterId = Number(ownProps.match.params.characterId)

  return {
    user: state.user,
    character: state.characters.find(character => character.id === characterId)
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateCharacter(character){
      dispatch(updateCharacter(character))
        .then(() => {
          dispatch(fetchCharacters())
          dispatch(fetchCampaigns())
        })
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditCharacter))
