import React from 'react'
import {Campaign} from '../components'

export default function SingleCampaignPage(props){
  const campaignId = props.match.params.campaignId;

  return (
    <div>
    This is the SingleCampaignPage!
    <Campaign id={campaignId} />
    </div>
  )
}
