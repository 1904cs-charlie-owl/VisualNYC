import React, {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import {changeTimeThunk} from '../store'
import {connect} from 'react-redux'
import CrimeSlider from './time-slider'

const CrimeHeat = props => {
  const [layer, setLayer] = useState(null)
  const heatMapRenderer = {
    type: 'heatmap',
    colorStops: [
      {color: 'rgba(63, 40, 102, 0)', ratio: 0},
      {color: '#472b77', ratio: 0.083},
      {color: '#4e2d87', ratio: 0.166},
      {color: '#563098', ratio: 0.249},
      {color: '#5d32a8', ratio: 0.332},
      {color: '#6735be', ratio: 0.415},
      {color: '#7139d4', ratio: 0.498},
      {color: '#7b3ce9', ratio: 0.581},
      {color: '#853fff', ratio: 0.664},
      {color: '#a46fbf', ratio: 0.747},
      {color: '#c29f80', ratio: 0.83},
      {color: '#e0cf40', ratio: 0.913},
      {color: '#ffff00', ratio: 1}
    ],
    maxPixelIntensity: 500,
    minPixelIntensity: 0
  }

  useEffect(
    () => {
      loadModules([
        'esri/layers/FeatureLayer',
        'esri/widgets/Expand',
        'esri/core/watchUtils'
      ])
        .then(([FeatureLayer]) => {
          const template = {
            title: '{PD_DESC}',
            content:

              '<p><b>Crime:</b> {OFNS_DESC}</p> <b>Date:</b> {CMPLNT_FR_DT:DateString(hideTime: true)} <b>Time:</b>{CMPLNT_FR_TM} <b>'
          }
          let initLayer = new FeatureLayer({
            url: `https://services9.arcgis.com/11PXd1ZqyV8pqiij/arcgis/rest/services/9s4h_37hy_2/FeatureServer`,
            renderer: heatMapRenderer,
            title: 'Crime Heat Map',
            definitionExpression: `CMPLNT_FR_TM >= '${props.currentHour -
              1}:00:00'`
          })

          setLayer(initLayer)
          if (
            !props.map.allLayers.items
              .map(item => item.title)
              .includes('Crime Heat Map')
          )
            props.map.add(initLayer)

          props.view.when().then(function() {
            const simpleRenderer = {
              type: 'simple',
              symbol: {
                type: 'simple-marker',
                color: '#c80000',
                size: 10
              },
              visualVariables: [
                {
                  type: 'size',
                  field: 'KY_CD',
                  stops: [
                    {value: 101, size: 24, label: 'High Severity'},
                    {value: 678, size: 4, label: 'Low Severity'}
                  ]
                }
              ]
            }

            props.view.watch('scale', function(newValue) {
              initLayer.renderer =
                newValue <= 10000 ? simpleRenderer : heatMapRenderer
              initLayer.popupTemplate = newValue <= 10000 ? template : null
            })
          })
        })
        .catch(err => console.error(err))
      return function cleanup() {
        props.map.remove(layer)
      }
    },
    [props.currentHour]
  )
  return (
    <CrimeSlider
      currentHourPct={props.view.currentHour / 24 * 100}
      style={{position: 'absolute'}}
      changeTime={props.changeTime}
    />
  )
}

const mapStateToProps = state => {
  let view = state.view
  return {view}
}

const mapDispatchToProps = dispatch => {
  return {
    changeTime: newTime => dispatch(changeTimeThunk(newTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeHeat)
