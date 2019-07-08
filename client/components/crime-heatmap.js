/* eslint-disable complexity */
import React, {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import {connect} from 'react-redux'
import crimeCodes from '../crimeCategoryCodes'

const CrimeHeat = props => {
  const [layer, setLayer] = useState(null)
  const heatMapRenderer = {
    type: 'heatmap',
    colorStops: [
      {color: 'rgba(63, 40, 102, 0)', ratio: 0},
      {color: 'rgb(118, 57, 255)', ratio: 0.2},
      {color: 'rgb(255, 0, 0)', ratio: 0.4},
      {color: 'rgb(248, 255, 0)', ratio: 0.9}
    ],
    maxPixelIntensity: 100,
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
          let classFilter = props.mapView.classFilter
          let categoryFilter = props.mapView.categoryFilter

          const template = {
            title: '{PD_DESC}',
            content: `<p><b>Severity:</b> {LAW_CAT_CD} </p>
              <b>Date:</b> {month}-{day}-{year}<p><b>Time: </b>{CMPLNT_FR_TM} </p>`,
            fieldInfos: [
              {
                fieldName: 'CMPLNT_FR_DT',
                format: {
                  dateFormat: 'short-date-short-time'
                }
              }
            ]
          }

          let oneHourBefore = String(props.currentHour)
          let oneHourAfter = String(props.currentHour + 2)

          if (Number(oneHourBefore) < 10) {
            oneHourBefore = '0' + oneHourBefore
          }

          if (Number(oneHourAfter) < 10) {
            oneHourAfter = '0' + oneHourAfter
          }

          const whereString =
            `CMPLNT_FR_TM BETWEEN '${oneHourBefore}
                  :00:00' AND '${oneHourAfter}:00:00' AND
                  dow = '${props.mapView.day}' AND
                  LAW_CAT_CD IN ('${classFilter.felony ? 'FELONY' : ''}', '${
              classFilter.misd ? 'MISDEMEANOR' : ''
            }',
                    '${classFilter.viol ? 'VIOLATION' : ''}') AND
                  KY_CD IN (${
                    categoryFilter.HOMICIDE ? crimeCodes.HOMICIDE : ''
                  }${categoryFilter.SEXCRIME ? crimeCodes.SEXCRIME : ''}${
              categoryFilter.THEFTFRAUD ? crimeCodes.THEFTFRAUD : ''
            }${categoryFilter.OTHERVIOLENT ? crimeCodes.OTHERVIOLENT : ''}${
              categoryFilter.DRUGS ? crimeCodes.DRUGS : ''
            }${categoryFilter.OTHER ? crimeCodes.OTHER : ''})`.slice(0, -2) +
            ')'

          const url = `https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27%20AND%20boro_nm=%27${
            props.mapView.boro
          }%27&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon,KY_CD,OFNS_DESC,PD_DESC, date_extract_m(CMPLNT_FR_DT) AS month, date_extract_d(CMPLNT_FR_DT) AS day, date_extract_y(CMPLNT_FR_DT) AS year, date_extract_dow(cmplnt_fr_dt) AS dow&$limit=500000`
          console.log(url)

          // default - Manhattan
          let initLayer = new GeoJSONLayer({
            url,
            // url: `/9s4h-37hy_6.geojson`,
            renderer: heatMapRenderer,
            title: 'Crime Heat Map'
          })

          setLayer(initLayer)
          if (
            !props.map.allLayers.find(
              curLayer => curLayer.title === 'Crime Heat Map'
            )
          ) {
            props.map.add(initLayer)

            props.view
              .whenLayerView(
                props.map.allLayers.find(
                  curLayer => curLayer.title === 'Crime Heat Map'
                )
              )
              .then(function(layerView) {
                layerView.filter = {
                  where: whereString
                }
              })
          } else {
            const oldLayer = props.map.allLayers.find(
              curLayer => curLayer.title === 'Crime Heat Map'
            )
            props.map.remove(oldLayer)

            props.map.add(initLayer)
            props.view
              .whenLayerView(
                props.map.allLayers.find(
                  curLayer => curLayer.title === 'Crime Heat Map'
                )
              )
              .then(function(layerView) {
                layerView.filter = {
                  where: whereString
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
                newValue <= 12000 ? simpleRenderer : heatMapRenderer
              initLayer.popupTemplate = newValue <= 12000 ? template : null
            })
          })
        })
        .catch(err => console.error(err))
    },
    [
      props.mapView.day,
      props.mapView.currentHour,
      props.mapView.classFilter,
      props.mapView.categoryFilter,
      props.mapView.boro
    ]
  )

  return <div />
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

export default connect(mapStateToProps, null)(CrimeHeat)
