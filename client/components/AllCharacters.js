import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllCharacters extends React.Component {
  constructor(){
    super();
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch(event) {
    this.setState({ search: event.target.value })
  }

  render () {
    let filteredCharacters = this.props.characters.filter(character => {
      return character.name.indexOf(this.state.search) !== -1;
    });
    return (
      <div>
        <h3>Explore Characters</h3>
        Search by name:
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
          name="Search" />
        <br />
        <br />
        {
          filteredCharacters.map(character =>
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
}

const mapState = (state) => {
  return {
    characters: state.characters
  }
}


export default connect(mapState)(AllCharacters)

