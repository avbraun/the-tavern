import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CAMPAIGNS = 'GET_CAMPAIGNS'

/**
 * INITIAL STATE
 */
const initialCampaigns = []

/**
 * ACTION CREATORS
 */
const getCampaigns = campaigns => ({type: GET_CAMPAIGNS, campaigns})

/**
 * THUNK CREATORS
 */
export const fetchCampaigns = () =>
  dispatch =>
    axios.get('/api/campaigns/')
      .then(res => {
        dispatch(getCampaigns(res.data))
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = initialCampaigns, action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      return action.campaigns
    default:
      return state
  }
}
