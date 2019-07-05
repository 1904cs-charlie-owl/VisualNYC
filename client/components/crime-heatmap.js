import React, {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import {connect} from 'react-redux'

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

          const currentDate = new Date()
          const currentDay = currentDate.getDay()

          let initLayer = new GeoJSONLayer({
            url: `https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27%20and%20date_extract_dow(cmplnt_fr_dt)=${currentDay}&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon,KY_CD,OFNS_DESC,PD_DESC, date_extract_m(CMPLNT_FR_DT) AS month, date_extract_d(CMPLNT_FR_DT) AS day, date_extract_y(CMPLNT_FR_DT) AS year&$limit=500000`,
            renderer: heatMapRenderer,
            title: 'Crime Heat Map'
          })

          setLayer(initLayer)
          let crimeFilter = props.mapView.crimeFilter
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
                let oneHourBefore = String(props.currentHour)
                let oneHourAfter = String(props.currentHour + 2)

                if (Number(oneHourBefore) < 10) {
                  oneHourBefore = '0' + oneHourBefore
                }

                if (Number(oneHourAfter) < 10) {
                  oneHourAfter = '0' + oneHourAfter
                }

                layerView.filter = {
                  where: `CMPLNT_FR_TM BETWEEN '${oneHourBefore}
                  :00:00' AND '${oneHourAfter}:00:00' AND LAW_CAT_CD IN ('${
                    crimeFilter.felony ? 'FELONY' : ''
                  }', '${crimeFilter.misd ? 'MISDEMEANOR' : ''}',
                    '${crimeFilter.viol ? 'VIOLATION' : ''}')`
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
                let oneHourBefore = String(props.currentHour)
                let oneHourAfter = String(props.currentHour + 2)

                if (Number(oneHourBefore) < 10) {
                  oneHourBefore = '0' + oneHourBefore
                }

                if (Number(oneHourAfter) < 10) {
                  oneHourAfter = '0' + oneHourAfter
                }

                layerView.filter = {
                  where: `CMPLNT_FR_TM BETWEEN '${oneHourBefore}
                  :00:00' AND '${oneHourAfter}:00:00' AND LAW_CAT_CD IN ('${
                    crimeFilter.felony ? 'FELONY' : ''
                  }', '${crimeFilter.misd ? 'MISDEMEANOR' : ''}',
                    '${crimeFilter.viol ? 'VIOLATION' : ''}')`
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
    [props.mapView.currentHour, props.mapView.crimeFilter]
  )

  return <div />
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

export default connect(mapStateToProps, null)(CrimeHeat)
