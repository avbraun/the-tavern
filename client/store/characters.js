import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CHARACTERS = 'GET_CHARACTERS'
const ADD_CHARACTER = 'ADD_CHARACTER'

/**
 * INITIAL STATE
 */
const initialCharacters = []

/**
 * ACTION CREATORS
 */
const getCharacters = characters => ({ type: GET_CHARACTERS, characters })
const addCharacter = character => ({ type: ADD_CHARACTER, character })

/**
 * THUNK CREATORS
 */
export const fetchCharacters = () =>
  dispatch =>
    axios.get('/api/characters/all')
      .then(res => {
        dispatch(getCharacters(res.data))
      })
      .catch(err => console.log(err))

export const postCharacter = character =>
  dispatch =>
    axios.post('api/characters/new', character)
      .then(res => {
        dispatch(addCharacter(res.data))
      })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = initialCharacters, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return action.characters
    case ADD_CHARACTER:
      return [...initialCharacters, action.character]
    default:
      return state
  }
}
