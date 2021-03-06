import axios from 'axios'
import history from '../history'
import {loadState} from '../loadState'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  name: Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 10),
  email:
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10) +
    '@' +
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10)
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

const editUser = user => {
  return {
    type: EDIT_USER,
    user
  }
}

/**
 * THUNK CREATORS
 */

export const getDefaultUser = () => async dispatch => {
  try {
    const storedState = loadState()
    if (storedState) {
      const res = await axios.get(
        `/api/users?name=${storedState.user.name}&email=${
          storedState.user.email
        }`
      )
      dispatch(getUser(res.data))
    } else {
      const res = await axios.get(
        `/api/users?name=${defaultUser.name}&email=${defaultUser.email}`
      )
      dispatch(getUser(res.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    if (res.data) {
      dispatch(getUser(res.data))
    } else {
      dispatch(getDefaultUser())
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/profile')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const editUserProfile = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(editUser(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}
