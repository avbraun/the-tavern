import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CAMPAIGNS = 'GET_CAMPAIGNS'
const ADD_CAMPAIGN = 'ADD_CAMPAIGN'
// const ADD_USER_TO_CAMPAIGN = 'ADD_USER_TO_CAMPAIGN'
// const ADD_CHARACTER_TO_CAMPAIGN = 'ADD_CHARACTER_TO_CAMPAIGN'

/**
 * INITIAL STATE
 */
const initialCampaigns = []

/**
 * ACTION CREATORS
 */
const getCampaigns = campaigns => ({ type: GET_CAMPAIGNS, campaigns })
const addCampaign = campaign => ({ type: ADD_CAMPAIGN, campaign })
// const addUserToCampaign = (user, campaign) => ({ type: ADD_USER_TO_CAMPAIGN, campaign, user})
// const addCharacterToCampaign = (character, campaign) => ({ type: ADD_CHARACTER_TO_CAMPAIGN, character, campaign })

/**
 * THUNK CREATORS
 */
export const fetchCampaigns = () =>
  dispatch =>
    axios.get('/api/campaigns/all')
      .then(res => {
        dispatch(getCampaigns(res.data))
      })
      .catch(err => console.log(err))

export const postCampaign = (campaign) =>
  dispatch =>
    axios.post('/api/campaigns/new', campaign)
      .then(res => {
        dispatch(addCampaign(res.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = initialCampaigns, action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      return action.campaigns
    case ADD_CAMPAIGN:
      return [...initialCampaigns, action.campaign]
    // case ADD_USER_TO_CAMPAIGN:
    //   let selectedCampaign = initialCampaigns.find({
    //     where: { id: action.campaign.id }
    //   }).users()
    //   return selectedCampaign.users
    default:
      return state
  }
}
