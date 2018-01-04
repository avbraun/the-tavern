import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CHARACTERS = 'GET_CHARACTERS'
const ADD_CHARACTER = 'ADD_CHARACTER'
const EDIT_CHARACTER = 'EDIT_CHARACTER'
const DELETE_CHARACTER = 'DELETE_CHARACTER'

/**
 * ACTION CREATORS
 */
const getCharacters = characters => ({ type: GET_CHARACTERS, characters })
const addCharacter = character => ({ type: ADD_CHARACTER, character })
const editCharacter = character => ({ type: EDIT_CHARACTER, character })
const deleteCharacter = character => ({ type: DELETE_CHARACTER, character })

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
    axios.post('/api/characters/new', character)
      .then(res => {
        console.log('res data: ', res.data)
        dispatch(addCharacter(res.data))
      })
      .catch(err => console.log(err))

export const updateCharacter = updateObj =>
  dispatch =>
    axios.put('/api/characters/update', updateObj)
      .then(res => {
        dispatch(editCharacter(res.data))
      })
      .catch(err => console.log(err))

export const removeCharacter = characterId =>
  dispatch =>
    axios.delete(`/api/characters/${characterId}/delete`)
      .then(() => dispatch(deleteCharacter(characterId)))
      // .then(() => history.push())
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return action.characters
    case ADD_CHARACTER:
      return [...state, action.character]
    case EDIT_CHARACTER:
      let newState = [...state];
      let characterIndex = state.findIndex(character => character.id === action.character.id);
      newState[characterIndex] = action.character;
      return newState;

    case DELETE_CHARACTER:
      let nextState = [...state];
      let charIndex = state.findIndex(character => character.id === action.character);
      console.log('charindex: ', charIndex)
      // nextState = nextState.slice(0, charIndex - 1).concat(nextState.slice(charIndex))
      console.log('splice: ', nextState.splice(charIndex, 1))
      return nextState;

    default:
      return state
  }
}
