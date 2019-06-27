/* eslint-disable react/display-name */
import React from 'react'
import {Map, Scene} from '@esri/react-arcgis'
import BoroughLayer from './borough-layer'
import CrimeLayer from './crime-layer'
import BuildingLayer from './building-layer'
import LayerList from './layerlistwidget'
import CrimeHeat from './crime-heatmap'

const loaderOptions = {
  url: 'http://js.arcgis.com/4.11'
}

const loaderOptions = {
  url: 'http://js.arcgis.com/4.11'
}

export default props => {
  return (
    <Map
      style={{width: '100vw', height: '100vh'}}
      mapProperties={{basemap: 'dark-gray-vector'}}
      viewProperties={{
        center: [-73.953413, 40.788602],
        zoom: 12.5
      }}
      loaderOptions={loaderOptions}
    >
      <LayerList />
      <BoroughLayer />
      <CrimeHeat />
      <BuildingLayer />
    </Map>
  )
}
