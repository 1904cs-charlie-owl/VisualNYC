import React from 'react'
import {WebMap, WebScene} from '@esri/react-arcgis'

const SwitchButton = props => {
  console.log(props)
  const switchButton = document.createElement('button')
  switchButton.innerHTML = props.butText ? '2D' : '3D'
  switchButton.onclick = () => props.toggle3d(!props.threeD)
  props.view.ui.add(switchButton, 'top-left')

  return <div />
}

function switchView() {}

export default SwitchButton
