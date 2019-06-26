/* eslint-disable react/display-name */
import React from 'react'
import {Map} from '@esri/react-arcgis'

export default props => (
  <Map
    style={{width: '100vw', height: '100vh'}}
    mapProperties={{basemap: 'dark-gray-vector'}}
    viewProperties={{
      center: [-73.953413, 40.788602],
      zoom: 12.5
    }}
  />
)
