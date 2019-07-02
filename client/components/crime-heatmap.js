import React, {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import {changeTimeThunk} from '../store'
import {connect} from 'react-redux'
import CrimeSlider from './time-slider'
import TimePicker from './time-field'

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
        'esri/layers/GeoJSONLayer',
        'esri/widgets/Expand',
        'esri/core/watchUtils'
      ])
        .then(([GeoJSONLayer]) => {
          const template = {
            title: '{PD_DESC}',
            content: `<p><b>Severity:</b> {LAW_CAT_CD} </p>
              <b>Date:</b> {CMPLNT_FR_DT:DateString(hideTime: true)}<p><b>Time: </b>{CMPLNT_FR_TM:DateFormat(datePattern: "h:mm a",selector: "date")} </p>`
          }
          let initLayer = new GeoJSONLayer({
            url: `https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon,KY_CD,OFNS_DESC,PD_DESC&$limit=500000`,
            renderer: heatMapRenderer,
            title: 'Crime Heat Map'
          })

          setLayer(initLayer)

          if (
            !props.map.allLayers.items
              .map(item => item.title)
              .includes('Crime Heat Map')
          ) {
            props.map.add(initLayer)

            props.view
              .whenLayerView(
                props.map.allLayers.find(
                  curLayer => curLayer.title === 'Crime Heat Map'
                )
              )
              .then(function(layerView) {
                let oneHourBefore = String(props.currentHour - 1)
                let oneHourAfter = String(props.currentHour + 1)

                if (Number(oneHourBefore) < 10) {
                  oneHourBefore = '0' + oneHourBefore
                }

                if (Number(oneHourAfter) < 10) {
                  oneHourAfter = '0' + oneHourAfter
                }

                layerView.filter = {
                  where: `CMPLNT_FR_TM BETWEEN '${oneHourBefore -
                    1}:00:00' AND '${oneHourAfter + 1}:00:00'`
                }
              })
          } else {
            props.view
              .whenLayerView(
                props.map.allLayers.find(
                  curLayer => curLayer.title === 'Crime Heat Map'
                )
              )
              .then(function(layerView) {
                let oneHourBefore = String(props.currentHour - 1)
                let oneHourAfter = String(props.currentHour + 1)

                if (Number(oneHourBefore) < 10) {
                  oneHourBefore = '0' + oneHourBefore
                }

                if (Number(oneHourAfter) < 10) {
                  oneHourAfter = '0' + oneHourAfter
                }

                layerView.filter = {
                  where: `CMPLNT_FR_TM BETWEEN '${oneHourBefore}:00:00' AND '${oneHourAfter}:00:00'`
                }
              })
          }

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
                  legendOptions: {
                    title: 'Class of Crime'
                  },
                  stops: [
                    {value: 101, size: 24, label: 'High Severity'},
                    {value: 678, size: 4, label: 'Low Severity'}
                  ]
                },
                {
                  type: 'color',
                  field: 'KY_CD',
                  legendOptions: {
                    title: 'Type of Crime'
                  },
                  stops: [
                    {value: 101, color: '#c80000'},
                    {value: 678, color: '#FFA07A'}
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
    },
    [props.currentHour]
  )
  return (
    <CrimeSlider
      currentHourPct={props.mapView.currentHour / 24 * 100}
      changeTime={props.changeTime}
      view={props.view}
    />
  )
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    changeTime: newTime => dispatch(changeTimeThunk(newTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeHeat)
