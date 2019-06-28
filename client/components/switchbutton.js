import React from 'react'

const SwitchButton = props => {
  const switchButton = document.createElement('button')
  switchButton.innerHTML = props.threeD ? '3D' : '2D'
  switchButton.onclick = () => props.toggle3d(!props.threeD)
  props.view.ui.add(switchButton, 'top-left')

  return <div />
}

export default SwitchButton
