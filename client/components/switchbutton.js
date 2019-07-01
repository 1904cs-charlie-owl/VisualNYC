import React from 'react'
import {connect} from 'react-redux'
import {changeLoadStatus} from '../store'

const SwitchButton = props => {
  const switchButton = document.createElement('button')
  switchButton.innerHTML = props.threeD ? '2D' : '3D'
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
