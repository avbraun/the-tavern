import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CAMPAIGNS = 'GET_CAMPAIGNS'
const ADD_CAMPAIGN = 'ADD_CAMPAIGN'
const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN'

/**
 * ACTION CREATORS
 */
const getCampaigns = campaigns => ({ type: GET_CAMPAIGNS, campaigns })
const addCampaign = campaign => ({ type: ADD_CAMPAIGN, campaign })
const editCampaign = campaign => ({ type: EDIT_CAMPAIGN, campaign })

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

export const postCampaign = campaign =>
  dispatch =>
    axios.post('/api/campaigns/new', campaign)
      .then(res => {
        dispatch(addCampaign(res.data))
      })
      .catch(err => console.log(err))

export const updateCampaign = campaign =>
  dispatch =>
    axios.put('/api/campaigns/update', campaign)
      .then(res => {
        dispatch(editCampaign(res.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      return action.campaigns
    case ADD_CAMPAIGN:
      return [...state, action.campaign]
    case EDIT_CAMPAIGN:
      // let newState = [...state];
      // let campaignIn = state.findIndex(user => user.id === action.user.id);
      // newState[userIndex] = action.user;
      // return newState;
    default:
      return state
  }
}
