import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import matchSorter from 'match-sorter'

class AllCharacters extends React.Component {
  constructor(){
    super();
    this.state = {
      search: '',
      alignmentSearch: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    // Determines use of matchSorter based on whether the search field and/or alignment filter is used
    let filteredCharacters;
    let search = matchSorter(this.props.characters, this.state.search, { keys: ['name', 'race', 'charClass', 'description'] });
    let alignment = matchSorter(this.props.characters, this.state.alignmentSearch, { keys: ['alignment'] });
    let both = matchSorter(alignment, this.state.search, { keys: [ 'name', 'race', 'charClass', 'description' ] });

    if (this.state.search && this.state.alignmentSearch) filteredCharacters = both;
    else if (this.state.search) filteredCharacters = search;
    else filteredCharacters = alignment;

    return (
      <div>
        <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/hero_dmgscreen_0.jpg?itok=Iy7FLffb" />
        <h3>Explore Characters</h3>
        <button><Link to="/characters/new">Create Your Own</Link></button>
        <br />
        <br />
        Search:
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
          name="search" />
        <br />
        Alignment:
        <select onChange={this.updateSearch} value={this.state.alignmentSearch} name="alignmentSearch">
          <option />
          <option>Lawful Good</option>
          <option>Neutral Good</option>
          <option>Chaotic Good</option>
          <option>Lawful Neutral</option>
          <option>Neutral</option>
          <option>Chaotic Neutral</option>
          <option>Lawful Evil</option>
          <option>Neutral Evil</option>
          <option>Chaotic Evil</option>
        </select>
        <br />
        <br />
        {
          filteredCharacters.length ?
          filteredCharacters.map(character =>
            <div key={`filtered-char-${character.id}`}>
            NAME: <Link to={`/characters/${character.id}`}>{character.name}</Link><br />
            RACE: {character.race}<br />
            CLASS: {character.charClass}<br />
            ALIGNMENT: {character.alignment}<br />
            {
              character.campaignId ?
              <div>
              CURRENT CAMPAIGN: <Link to={`/campaigns/${character.campaignId}`}>{character.campaign.name}</Link>
              </div> :
              <div>
              CURRENT CAMPAIGN: n/a
              </div>
            }
            <br />
            </div>) :
            <div>No character like that exists... yet! Would you like to create one?</div>
          }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    characters: state.characters.filter(character => !character.userId || (character.userId && character.campaignId)),
  }
}


export default connect(mapState)(AllCharacters)

