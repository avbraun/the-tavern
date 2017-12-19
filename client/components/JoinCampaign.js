import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const JoinCampaign = (props) => {
  const {user, campaigns} = props

  return (
    <div>
      <h3>Join a campaign!</h3>
      {
        campaigns.map(campaign =>
          <div id={`div-${campaign.id}`}>
          <Link
            key={campaign.id}
            to={`/campaigns/${campaign.id}`}>
          {campaign.name}
          </Link>
          </div>)
        }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    campaigns: state.campaigns
  }
}


export default connect(mapState)(JoinCampaign)
