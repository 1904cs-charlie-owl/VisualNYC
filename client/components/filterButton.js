import React from 'react'
import {connect} from 'react-redux'
import {toggleHideFilter} from '../store'

const FilterButton = props => {
  const filterButton = document.createElement('button')
  filterButton.setAttribute(
    'style',
    'width:32px; height:32px;font-size:.85em; background-color: #242424; color: #69dcff; border-width: 0px; font-weight: bold'
  )
  const icon = document.createElement('span')
  icon.className = 'esri-icon-left-triangle-arrow'
  filterButton.appendChild(icon)
  filterButton.onclick = () => props.toggleFilters()
  if (props.mapView.initialLoad) props.view.ui.add(filterButton, 'bottom-right')

  return <div />
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFilters: () => dispatch(toggleHideFilter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton)
