/**
 * ACTION TYPES
 */
const TOOGLE_3D = 'TOOGLE_3D'
const CHANGE_TIME = 'CHANGE_TIME'

/**
 * INITIAL STATE
 */

let currentTime = new Date()
let currentHour = currentTime.getHours()

const defaultView = {
  threeD: false,
  currentHour
}

/**
 * ACTION CREATORS
 */
export const toggle3dAction = threeD => ({type: TOOGLE_3D, threeD})
export const changeTimeAction = newTime => ({type: CHANGE_TIME, newTime})

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
    default:
      return state
  }
}
