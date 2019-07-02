/**
 * ACTION TYPES
 */
const TOOGLE_3D = 'TOOGLE_3D'
const CHANGE_TIME = 'CHANGE_TIME'
const INITIAL_LOAD = 'INITIAL_LOAD'
const FILTER_CHANGE = 'FILTER_CHANGE'

/**
 * INITIAL STATE
 */

let currentTime = new Date()
let currentHour = currentTime.getHours()
let initialLoad = true
let crimeFilter = {
  felony: true,
  misd: true,
  viol: true
}

const defaultView = {
  threeD: false,
  currentHour,
  initialLoad,
  crimeFilter
}

/**
 * ACTION CREATORS
 */
export const toggle3dAction = threeD => ({type: TOOGLE_3D, threeD})
export const changeTimeAction = newTime => ({type: CHANGE_TIME, newTime})
export const initialLoadCheck = () => ({type: INITIAL_LOAD})
export const crimeFilterChange = (filterValue, checked) => ({
  type: FILTER_CHANGE,
  filterValue,
  checked
})

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

export const changeFilter = () => {
  // console.log('filterValue: ', filterValue)
  // console.log('checked', checked)
  console.log('what is wrong?')
  return dispatch => {
    dispatch(crimeFilterChange(filterValue, checked))
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
      newState.initialLoad = true
      return newState
    case CHANGE_TIME:
      newState.currentHour = action.newTime
      return newState
    case INITIAL_LOAD:
      newState.initialLoad = false
      return newState
    case FILTER_CHANGE:
      console.log('fuck off')
      // newState.crimeFilter = {
      //   ...crimeFilter,
      //   [action.filterValue]: action.checked
      // }
      return newState
    default:
      return state
  }
}
