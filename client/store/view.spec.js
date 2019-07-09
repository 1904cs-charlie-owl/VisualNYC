import {expect} from 'chai'
import {createStore} from 'redux'

import view, {
  toggle3dAction,
  changeTimeAction,
  initialLoadCheck,
  classFilterChange,
  categoryFilterChange,
  changeDay,
  toggle3d,
  changeTimeThunk,
  changeLoadStatus,
  changeClassFilter,
  changeCategoryFilter,
  newDay
} from './view'
import viewReducer from './view'
//jkadded below
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})
//jk added above

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const days = [0, 1, 2, 3, 4, 5, 6]
const fish = ['Seahorse', 'Octopus', 'Stingray']

function getRandomHour(hour) {
  return hour[Math.floor(Math.random() * 9)]
}

describe('Action Creators', () => {
  describe('changeTimeAction', () => {
    it('returns properly formatted change timeaction', () => {
      const testHour = getRandomHour(hours)
      expect(changeTimeAction(testHour)).to.be.deep.equal({
        type: 'CHANGE_TIME',
        newTime: testHour
      })
    })
    it('returns properly formatted toggle 3d action', () => {
      expect(toggle3dAction(true)).to.be.deep.equal({
        type: 'TOOGLE_3D',
        threeD: true
      })
    })
    it('returns properly formatted initial load action', () => {
      expect(initialLoadCheck()).to.be.deep.equal({
        type: 'INITIAL_LOAD'
      })
    })
    it('returns properly formatted category change action', () => {
      expect(categoryFilterChange('HOMICIDE', false)).to.be.deep.equal({
        type: 'CATEGORY_FILTER_CHANGE',
        filterValue: 'HOMICIDE',
        checked: false
      })
    })
    it('returns properly formatted class change action', () => {
      expect(classFilterChange('misd', false)).to.be.deep.equal({
        type: 'CLASS_FILTER_CHANGE',
        filterValue: 'misd',
        checked: false
      })
    })
    it('returns properly formatted change day', () => {
      const testDay = getRandomHour(days)
      expect(changeDay(testDay)).to.be.deep.equal({
        type: 'CHANGE_DAY',
        day: testDay
      })
    })
  })
})

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
let boro = 'MANHATTAN'

const defaultView = {
  threeD: false,
  currentHour,
  initialLoad,
  classFilter,
  categoryFilter,
  day: currentDay,
  boro
}
let testStore

describe('Reducer', () => {
  beforeEach('Create testing store and freezing it', () => {
    testStore = createStore(view)
    // freeze store so we don't mutate!!
    Object.freeze(testStore.getState())
  })

  it('has expected initial state', () => {
    expect(testStore.getState()).to.be.deep.equal(defaultView)
  })
})

describe('TOOGLE_3D', () => {
  it('toggles the 3d view', () => {
    expect(view(undefined, {type: 'TOOGLE_3D', threeD: true})).to.deep.equal({
      threeD: true,
      currentHour,
      initialLoad,
      classFilter,
      categoryFilter,
      day: currentDay,
      boro
    })
  })
})

describe('CHANGE_TIME', () => {
  const testHour = getRandomHour(hours)
  it('chages the time', () => {
    expect(
      view(undefined, {type: 'CHANGE_TIME', newTime: testHour})
    ).to.deep.equal({
      threeD: false,
      currentHour: testHour,
      initialLoad,
      classFilter,
      categoryFilter,
      day: currentDay,
      boro
    })
  })
})

describe('INITIAL_LOAD', () => {
  it('changes the state of the initial load check', () => {
    expect(view(undefined, {type: 'INITIAL_LOAD'})).to.deep.equal({
      threeD: false,
      currentHour,
      initialLoad: false,
      classFilter,
      categoryFilter,
      day: currentDay,
      boro
    })
  })
})

describe('CLASS_FILTER_CHANGE', () => {
  it('changes the state of the class filter', () => {
    expect(
      view(undefined, {
        type: 'CLASS_FILTER_CHANGE',
        filterValue: 'misd',
        checked: false
      })
    ).to.deep.equal({
      threeD: false,
      currentHour,
      initialLoad,
      classFilter: {
        felony: true,
        misd: false,
        viol: true
      },
      categoryFilter,
      day: currentDay,
      boro
    })
  })
})

describe('CATEGORY_FILTER_CHANGE', () => {
  it('changes the state of the category filter', () => {
    expect(
      view(undefined, {
        type: 'CATEGORY_FILTER_CHANGE',
        filterValue: 'THEFTFRAUD',
        checked: false
      })
    ).to.deep.equal({
      threeD: false,
      currentHour,
      initialLoad,
      classFilter,
      categoryFilter: {
        HOMICIDE: true,
        SEXCRIME: true,
        THEFTFRAUD: false,
        OTHERVIOLENT: true,
        DRUGS: true,
        OTHER: true
      },
      day: currentDay,
      boro
    })
  })
})

describe('CHANGE_DAY', () => {
  const testDay = getRandomHour(days)
  it('chages the day', () => {
    expect(view(undefined, {type: 'CHANGE_DAY', day: testDay})).to.deep.equal({
      threeD: false,
      currentHour,
      initialLoad,
      classFilter,
      categoryFilter,
      day: testDay,
      boro
    })
  })
})
