/**
 * ACTION TYPES
 */
const TOOGLE_3D = 'TOOGLE_3D'

/**
 * INITIAL STATE
 */
const defaultView = {
  threeD: false
}

/**
 * ACTION CREATORS
 */
export const toggle3dAction = threeD => ({type: TOOGLE_3D, threeD})

//{type: GET_3D, threeD }
/**
 * THUNK CREATORS
 */

export const toggle3d = threeD => {
  return dispatch => {
    dispatch(toggle3dAction(threeD))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultView, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case TOOGLE_3D:
      console.log('reducer')
      newState.threeD = action.threeD
      return newState
    default:
      return state
  }
}
