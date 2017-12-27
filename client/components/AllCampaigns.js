import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// class AllCharacters extends React.Component {
export const AllCampaigns = (props) => {
  const { campaigns } = props

  return (
    <div>
      <h3>Explore Campaigns</h3>
      <br />
      Advanced Search:
      <form>
      <input type="text" name="Search" />
      <input type="submit" value="Submit" />
      </form>
      <br />
      <br />
      {
        campaigns.map(campaign =>
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

const mapState = (state) => {
  return {
    campaigns: state.campaigns
  }
}


export default connect(mapState)(AllCampaigns)

