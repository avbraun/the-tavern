import React from 'react'
import {Campaign} from '../components'
import {NavLink, Route, Switch} from 'react-router-dom'

export default class SingleCampaignPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      campaignId: props.match.params.campaignId
    }
  }

  render () {
    const { campaignId } = this.props;
    return (
      <div>
      This is the SingleCampaignPage!
      <Campaign id={campaignId} />
      </div>
    )
  }
}
