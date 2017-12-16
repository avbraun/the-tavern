import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, campaigns} = props
console.log('campaigns: ', campaigns)
  return (
    <div>
      <h3>Welcome, {email}. Would you like to join a campaign?</h3>
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
    email: state.user.email,
    campaigns: state.campaigns
  }
}


export default connect(mapState)(UserHome)
