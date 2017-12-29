import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const allUsers = {}

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users })
const editUser = user => ({ type: EDIT_USER, user })

/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users/all')
      .then(res =>
        dispatch(getUsers(res.data)))
      .catch(err => console.log(err))

export const updateUser = userObj =>
  dispatch =>
    axios.put('/api/users/update', userObj)
      .then(res =>
        dispatch(editUser(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = allUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case EDIT_USER:
      let newState = [...state];
      let userIndex = state.findIndex(user => user.id === action.user.id);
      newState[userIndex] = action.user;
      return newState;
    default:
      return state
  }
}
