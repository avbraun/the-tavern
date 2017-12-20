import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AllCharacters = (props) => {
  const {user, characters} = props

  return (
    <div>
      <h3>Explore characters!</h3>
      {
        characters.map(character =>
          <div>
          Name: {character.name}<br />
          Species: {character.species}<br />
          Alignment: {character.alignment}<br />
          Description: {character.description}<br />
          {
            character.campaign ?
            <div>
            Current Campaign: <Link to={`/campaigns/${character.campaignId}`}>{character.campaign.name}</Link>
            </div> :
            <div>
            Current Campaign: n/a
            </div>
          }
          <br />
          </div>)
        }
    </div>
  )
}

const mapState = (state) => {
  return {
    characters: state.characters
  }
}


export default connect(mapState)(AllCharacters)
