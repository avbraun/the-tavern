import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Campaign = (props) => {
  const { campaign } = props

  return (
    <div>
    This is a campaign!
    {campaign.name}
    </div>
  )
}


const mapState = (state, ownProps) => {
  // console.log('ownProps: ', ownProps)
  // console.log('state.campaigns: ', state.campaigns)
  const campaignId = Number(ownProps.match.params.campaignId)

  return {
    campaign: state.campaigns.find(campaign => campaign.id === campaignId)
  }
}

export default withRouter(connect(mapState)(Campaign))
