import React from 'react'
import {Campaign} from '../components'

export default function SingleCampaignPage(props){
  const campaignId = props.match.params.campaignId;

  console.log('props.match.params...: ', props.match.params.campaignId) // 2

  return (
    <div>
    This is the SingleCampaignPage!
    <Campaign id={campaignId} />
    </div>
  )
}
