/**
 * ACTION TYPES
 */
const TOOGLE_3D = 'TOOGLE_3D'
const CHANGE_TIME = 'CHANGE_TIME'
const INITIAL_LOAD = 'INITIAL_LOAD'
const FILTER_CHANGE = 'FILTER_CHANGE'
const TOGGLE_HIDE = 'HIDE_FILTERS'
const CHANGE_DAY = 'CHANGE_DAY'

/**
 * INITIAL STATE
 */

let currentTime = new Date()
let currentHour = currentTime.getHours()
const currentDay = currentTime.getDay()
let initialLoad = true
let crimeFilter = {
  felony: true,
  misd: true,
  viol: true
}
let filterHidden = true

const defaultView = {
  threeD: false,
  currentHour,
  initialLoad,
  crimeFilter,
  filterHidden,
  day: currentDay
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
export const toggleFilterHiddenAction = hidden => ({type: TOGGLE_HIDE, hidden})
export const changeDay = day => ({type: CHANGE_DAY, day})

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

export const changeFilter = (filterValue, checked) => {
  return dispatch => {
    dispatch(crimeFilterChange(filterValue, checked))
  }
}

export const toggleHideFilter = () => {
  return dispatch => {
    dispatch(toggleFilterHiddenAction())
  }
}

export const newDay = day => {
  return dispatch => {
    dispatch(changeDay(day))
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
      newState.crimeFilter[action.filterValue] = action.checked
      return newState
    case TOGGLE_HIDE:
      newState.filterHidden = !newState.filterHidden
      return newState
    case CHANGE_DAY:
      newState.day = action.day
      return newState
    default:
      return state
  }
}
