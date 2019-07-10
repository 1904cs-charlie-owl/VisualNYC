/* eslint-disable complexity */
import React, {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import {connect} from 'react-redux'
import {categoryCodes} from '../crimeCategoryCodes'

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
            content: `<b>Severity:</b> {LAW_CAT_CD} <p><b>Location:</b> {PREM_TYP_DESC}</p>
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

          const boros = [
            'MANHATTAN',
            'BROOKLYN',
            'QUEENS',
            'STATEN ISLAND',
            'BRONX'
          ]

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
                    categoryFilter.HOMICIDE ? categoryCodes.HOMICIDE : ''
                  }${categoryFilter.SEXCRIME ? categoryCodes.SEXCRIME : ''}${
              categoryFilter.THEFTFRAUD ? categoryCodes.THEFTFRAUD : ''
            }${categoryFilter.OTHERVIOLENT ? categoryCodes.OTHERVIOLENT : ''}${
              categoryFilter.DRUGS ? categoryCodes.DRUGS : ''
            }${categoryFilter.OTHER ? categoryCodes.OTHER : ''})`.slice(0, -2) +
            ')'

          boros.forEach(boro => {
            const urlString = `https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?boro_nm=${boro}&$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27%20&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon,KY_CD,OFNS_DESC,PD_DESC,PREM_TYP_DESC,date_extract_m(CMPLNT_FR_DT) AS month, date_extract_d(CMPLNT_FR_DT) AS day, date_extract_y(CMPLNT_FR_DT) AS year, date_extract_dow(cmplnt_fr_dt) AS dow, BORO_NM&$limit=500000`
            if (!props.map.allLayers.find(curLayer => curLayer.id === boro)) {
              const initLayer = new GeoJSONLayer({
                url: urlString,
                // url: `/9s4h-37hy_6.geojson`,
                renderer: heatMapRenderer,
                title: 'Crime Density Heat Map',
                id: boro,
                legendEnabled: boro === 'MANHATTAN',
                visible: boro === 'MANHATTAN',
                listMode: boro === 'MANHATTAN' ? 'show' : 'hide'
              })

              props.map.add(initLayer)

              props.view
                .whenLayerView(
                  props.map.allLayers.find(curLayer => curLayer.id === boro)
                )
                .then(function(layerView) {
                  layerView.filter = {
                    where: whereString
                  }
                })

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
                        {value: 101, size: 24, label: 'Felony'},
                        {value: 678, size: 4, label: 'Violation'}
                      ]
                    },
                    {
                      type: 'color',
                      field: 'KY_CD',
                      legendOptions: {
                        title: 'Type of Crime'
                      },
                      stops: [
                        {value: 101, color: '#c80000', label: 'Homicide'},

                        {
                          value: 678,
                          color: '#FFA07A',
                          label: 'Minor Infraction'
                        }
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
            } else {
              const oldLayer = props.map.allLayers.find(
                curLayer =>
                  curLayer.visible === true &&
                  curLayer.title === 'Crime Density Heat Map'
              )
              oldLayer.visible = false
              oldLayer.legendEnabled = false
              oldLayer.listMode = 'hide'
              const newLayer = props.map.allLayers.find(
                curLayer => curLayer.id === props.mapView.boro
              )
              newLayer.visible = true
              newLayer.legendEnabled = true
              newLayer.listMode = 'show'
              props.view
                .whenLayerView(
                  props.map.allLayers.find(curLayer => curLayer.id === boro)
                )
                .then(function(layerView) {
                  layerView.filter = {
                    where: whereString
                  }
                })
            }
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
