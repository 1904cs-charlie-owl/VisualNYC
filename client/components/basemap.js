/* eslint-disable react/display-name */
import React from 'react'
import {Scene} from '@esri/react-arcgis'
import BoroughLayer from './borough-layer'
import CrimeLayer from './crime-layer'

console.log(BoroughLayer)

export default props => {
  return (
    <Scene
      style={{width: '100vw', height: '100vh'}}
      mapProperties={{basemap: 'dark-gray-vector'}}
      viewProperties={{
        center: [-73.953413, 40.788602],
        zoom: 12.5
      }}
    >
      <BoroughLayer />
      <CrimeLayer />
    </Scene>
  )
}
