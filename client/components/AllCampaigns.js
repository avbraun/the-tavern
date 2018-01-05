import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import matchSorter from 'match-sorter'

class AllCampaigns extends React.Component {
  constructor(){
    super();
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    let filteredCampaigns = matchSorter(this.props.campaigns, this.state.search, { keys: ['name'] });

    return (
      <div>
        <img src="http://dnd.wizards.com/sites/default/files/media/styles/news_banner_header/public/default_images/_Header_Article_Template.jpg?itok=0V79tvNJ" />
        <h3>Explore Campaigns</h3>
        <button><Link to="/campaigns/new">Create Your Own</Link></button>
        <br />
        <br />
        Search:
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
          name="search" />
        <br />
        <br />
        {
          filteredCampaigns.map(campaign =>
            <div key={`filtered-camp-${campaign.id}`}>
            NAME: <Link to={`/campaigns/${campaign.id}`}>{campaign.name}</Link><br />
            DM: {campaign.dm} <br />
            DESCRIPTION: {campaign.description}<br />
            <br />
            </div>)
          }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    campaigns: state.campaigns
  }
}


export default connect(mapState)(AllCampaigns)

