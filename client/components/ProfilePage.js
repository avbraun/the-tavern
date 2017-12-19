import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const ProfilePage = (props) => {
  const { user } = props

  return (
    <div>
    This is a profile page! {user.fullName}
    </div>
  )
}


const mapState = (state, ownProps) => {
  const userId = Number(ownProps.match.params.userId)

  return {
    // campaign: state.campaigns.find(campaign => campaign.id === campaignId),
    user: state.user
  }
}

export default withRouter(connect(mapState)(ProfilePage))
