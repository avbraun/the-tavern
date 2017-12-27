import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// class AllCharacters extends React.Component {
export const AllCharacters = (props) => {
  const {user, characters} = props

  return (
    <div>
      <h3>Explore Characters</h3>
      <br />
      Advanced Search:
      <form>
      <input type="text" name="Search" />
      <input type="submit" value="Submit" />
      </form>
      <br />
      <br />
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

