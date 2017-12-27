import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllCampaigns extends React.Component {
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

  render() {
    let filteredCampaigns = this.props.campaigns.filter(campaign => {
      return campaign.name.indexOf(this.state.search) !== -1;
    });
    return (
      <div>
        <h3>Explore Campaigns</h3>
        Search by name:
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
          name="Search" />
        <br />
        <br />
        {
          filteredCampaigns.map(campaign =>
            <div>
            Name: <Link to={`/campaigns/${campaign.id}`}>{campaign.name}</Link><br />
            DM: {campaign.dm} <br />
            Description: {campaign.description}<br />
            Players:
            <ul>
            {
              campaign.users.map(user =>
                  <li>{user.fullName}</li>
              )
            }
            </ul>
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

