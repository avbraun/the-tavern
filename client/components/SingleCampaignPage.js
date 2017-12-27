import React from 'react'
import {CampaignInfo} from '../components'
import {NavLink, Route, Switch} from 'react-router-dom'

// export default function SingleCampaignPage(props){
export default class SingleCampaignPage extends React.Component {
  // const campaignId = props.match.params.campaignId;
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
      {/*<div id="campaign-nav-bar">
        <NavLink to={`/campaigns/2/info`}>Basic Info</NavLink>
        <NavLink to={`/campaigns/${campaignId}/players`}>Players</NavLink>
        <NavLink to={`/campaigns/${campaignId}/gametime`}>Game Time</NavLink>
      </div>

      <Switch>
        <Route exact path="/campaigns/2/info" component={CampaignInfo} />
      </Switch>

      {/*<Campaign id={this.state.campaignId} />*/}
      </div>
    )
  }
}
