import React from 'react'
import {connect} from 'react-redux'
import {changeLoadStatus} from '../store'

const SwitchButton = props => {
  const switchButton = document.createElement('button')
  switchButton.innerHTML = props.threeD ? '<b>2D</b>' : '<b>3D</b>'
  switchButton.setAttribute(
    'style',
    'width:32px; height:32px; font-size:.85em; background-color: #242424; color: #69dcff; border-width: 0px '
  )
  switchButton.onclick = () => props.toggle3d(!props.threeD)
  if (props.mapView.initialLoad) props.view.ui.add(switchButton, 'top-left')
  if (props.mapView.initialLoad) props.initialLoad()

  return <div />
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: () => dispatch(changeLoadStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchButton)
