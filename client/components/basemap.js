/* eslint-disable react/display-name */
import React, {Component, useEffect} from 'react'
import {Map, Scene} from '@esri/react-arcgis'
import BoroughLayer from './borough-layer'
import CrimeLayer from './crime-layer'
import BuildingLayer from './building-layer'
import LayerList from './layerlistwidget'
import CrimeHeat from './crime-heatmap'
import SwitchButton from './switchbutton'
import {toggle3d} from '../store'
import {connect} from 'react-redux'
import NYCSubwayLines from './nycsubwaylayer'

const loaderOptions = {
  url: 'http://js.arcgis.com/4.11'
}

export function BaseMap(props) {
  if (!props.view.threeD) {
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
        <SwitchButton threeD={props.view.threeD} toggle3d={props.toggle3d} />
      </Map>
    )
  } else {
    return (
      <Scene
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
        <BuildingLayer />
        <NYCSubwayLines />
        <SwitchButton threeD={props.view.threeD} toggle3d={props.toggle3d} />
      </Scene>
    )
  }
}

const mapStateToProps = state => {
  let view = state.view
  return {view}
}

const mapDispatchToProps = dispatch => {
  return {toggle3d: threeD => dispatch(toggle3d(threeD))}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMap)
