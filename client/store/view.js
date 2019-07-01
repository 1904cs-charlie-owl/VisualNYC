/**
 * ACTION TYPES
 */
const TOOGLE_3D = 'TOOGLE_3D'
const CHANGE_TIME = 'CHANGE_TIME'
const INITIAL_LOAD = 'INITIAL_LOAD'

/**
 * INITIAL STATE
 */

let currentTime = new Date()
let currentHour = currentTime.getHours()
let initialLoad = true

const defaultView = {
  threeD: false,
  currentHour,
  initialLoad
}

/**
 * ACTION CREATORS
 */
export const toggle3dAction = threeD => ({type: TOOGLE_3D, threeD})
export const changeTimeAction = newTime => ({type: CHANGE_TIME, newTime})
export const initialLoadCheck = () => ({type: INITIAL_LOAD})

//{type: GET_3D, threeD }
/**
 * THUNK CREATORS
 */

export const toggle3d = threeD => {
  return dispatch => {
    dispatch(toggle3dAction(threeD))
  }
}

export const changeTimeThunk = newTime => {
  return dispatch => {
    dispatch(changeTimeAction(newTime))
  }
}

export const changeLoadStatus = () => {
  return dispatch => {
    dispatch(initialLoadCheck())
  }
}
/**
 * REDUCER
 */

export default function(state = defaultView, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case TOOGLE_3D:
      newState.threeD = action.threeD
      return newState
    case CHANGE_TIME:
      newState.currentHour = action.newTime
      return newState
    case INITIAL_LOAD:
      newState.initialLoad = false
      return newState
    default:
      return state
  }
}
