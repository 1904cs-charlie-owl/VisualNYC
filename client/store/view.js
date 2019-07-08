/**
 * ACTION TYPES
 */
const TOOGLE_3D = 'TOOGLE_3D'
const CHANGE_TIME = 'CHANGE_TIME'
const INITIAL_LOAD = 'INITIAL_LOAD'
const CLASS_FILTER_CHANGE = 'CLASS_FILTER_CHANGE'
const CATEGORY_FILTER_CHANGE = 'CATEGORY_FILTER_CHANGE'
const CHANGE_DAY = 'CHANGE_DAY'
const CHANGE_BORO = 'CHANGE_BORO'

/**
 * INITIAL STATE
 */

let currentTime = new Date()
let currentHour = currentTime.getHours()
const currentDay = currentTime.getDay()
let initialLoad = true
let classFilter = {
  felony: true,
  misd: true,
  viol: true
}
let categoryFilter = {
  HOMICIDE: true,
  SEXCRIME: true,
  THEFTFRAUD: true,
  OTHERVIOLENT: true,
  DRUGS: true,
  OTHER: true
}
let startBoro = 'MANHATTAN'

const defaultView = {
  threeD: false,
  currentHour,
  initialLoad,
  classFilter,
  categoryFilter,
  day: currentDay,
  boro: startBoro
}

/**
 * ACTION CREATORS
 */
export const toggle3dAction = threeD => ({type: TOOGLE_3D, threeD})
export const changeTimeAction = newTime => ({type: CHANGE_TIME, newTime})
export const initialLoadCheck = () => ({type: INITIAL_LOAD})
export const classFilterChange = (filterValue, checked) => ({
  type: CLASS_FILTER_CHANGE,
  filterValue,
  checked
})
export const categoryFilterChange = (filterValue, checked) => ({
  type: CATEGORY_FILTER_CHANGE,
  filterValue,
  checked
})
export const changeBoroAction = boro => ({type: CHANGE_BORO, boro})

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

export const changeClassFilter = (filterValue, checked) => {
  return dispatch => {
    dispatch(classFilterChange(filterValue, checked))
  }
}

export const changeCategoryFilter = (filterValue, checked) => {
  return dispatch => {
    dispatch(categoryFilterChange(filterValue, checked))
  }
}

export const newDay = day => {
  return dispatch => {
    dispatch(changeDay(day))
  }
}

export const changeBoroThunk = boro => {
  return dispatch => {
    dispatch(changeBoroAction(boro))
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
    case CLASS_FILTER_CHANGE:
      newState.classFilter[action.filterValue] = action.checked
      return newState
    case CATEGORY_FILTER_CHANGE:
      newState.categoryFilter[action.filterValue] = action.checked
      return newState
    case CHANGE_DAY:
      newState.day = action.day
      return newState
    case CHANGE_BORO:
      newState.boro = action.boro
      return newState
    default:
      return state
  }
}
