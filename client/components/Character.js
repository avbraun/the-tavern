import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Character = (props) => {
  const { character, user } = props
  return (
    <div>
    <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/hero_dmgscreen_0.jpg?itok=Iy7FLffb" />
    <h3>Character Profile: {character.name || 'Unnamed character'}</h3>
    NAME<br />
    {character.name || ''}<br />
    <br />
    SPECIES<br />
    {character.species || ''}<br />
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
      <button><Link to={`/characters/${character.id}/edit`}>Edit</Link></button> :
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

export default withRouter(connect(mapState)(Character))
