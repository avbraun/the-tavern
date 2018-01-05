import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {removeCharacter} from '../store'
import history from '../history'

const Character = (props) => {
  const { character, user, deleteCharacter } = props
  return (
    <div>
    <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/hero_dmgscreen_0.jpg?itok=Iy7FLffb" />
    <br />
    <h3 id="char-header-text">Character Profile: {character.name || 'Unnamed character'}</h3>
    NAME<br />
    {character.name || ''}<br />
    <br />
    RACE<br />
    {character.race || ''}<br />
    <br />
    CLASS<br />
    {character.charClass || ''}<br />
    <br />
    ALIGNMENT<br />
    {character.alignment || ''}<br />
    <br />
    DESCRIPTION<br />
    {character.description || ''}<br />
    <br />
    CAMPAIGN<br />
    {
      character.campaignId ?
      <Link to={`/campaigns/${character.campaignId}`}>{character.campaign.name}</Link> :
      'N/A'
    }
    <br />
    <br />
    {
      character.userId === user.id ?
      <div>
      <button><Link to={`/characters/${character.id}/edit`}>Edit</Link></button>
      <button onClick={() => deleteCharacter(user)}>Delete</button>
      </div> :
      <div />
    }
    </div>
  )
}


const mapState = (state, ownProps) => {
let characterId = Number(ownProps.match.params.characterId);
  return {
    user: state.user,
    character: state.characters.find(character => character.id === characterId)
  }
}

const mapDispatch = (dispatch, ownProps) => {
let characterId = Number(ownProps.match.params.characterId);
  return {
    deleteCharacter(user){
      history.push('/account/user')
      dispatch(removeCharacter(characterId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Character))
