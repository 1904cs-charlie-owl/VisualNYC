/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {Map, Scene} from '@esri/react-arcgis'
import BoroughLayer from './borough-layer'
import CrimeLayer from './crime-layer'
import BuildingLayer from './building-layer'
import LayerList from './layerlistwidget'
import CrimeHeat from './crime-heatmap'
import SwitchButton from './switchbutton'
import NYCSubwayLines from './nycsubwaylayer'

const loaderOptions = {
  url: 'http://js.arcgis.com/4.11'
}

class BaseMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is3d: false
    }
    this.toggle3d = this.toggle3d.bind(this)
  }

  toggle3d() {
    this.setState({is3d: !this.state.is3d})
  }

  render() {
    if (!this.state.is3d) {
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
          <NYCSubwayLines />
          <SwitchButton toggle3d={this.toggle3d} butText={this.state.is3d} />
        </Map>
      )
    } else {
      return (
        <Scene
          style={{width: '100vw', height: '100vh'}}
          mapProperties={{basemap: 'dark-gray-vector'}}
          viewProperties={{
            camera: {
              position: [-73.993413, 40.65002, 4000],
              tilt: 65
            }
          }}
          loaderOptions={loaderOptions}
        >
          <LayerList />
          <BoroughLayer />
          <BuildingLayer />
          <NYCSubwayLines />
          <SwitchButton toggle3d={this.toggle3d} butText={this.state.is3d} />
        </Scene>
      )
    }
  }
}

export default BaseMap
