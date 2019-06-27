/* eslint-disable react/display-name */
import React from 'react'
import {Map} from '@esri/react-arcgis'
import BoroughLayer from './borough-layer'
import CrimeLayer from './crime-layer'
import BuildingLayer from './building-layer'

export default props => {
  return (
    <Map
      style={{width: '100vw', height: '100vh'}}
      mapProperties={{basemap: 'satellite'}}
      viewProperties={{
        center: [-73.953413, 40.788602],
        zoom: 12.5
      }}
    >
      <BoroughLayer />
      <CrimeLayer />
      <BuildingLayer />
    </Map>
  )
}
