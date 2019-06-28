import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import view from '../store/view'

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

  useEffect(() => {
    loadModules([
      'esri/layers/GeoJSONLayer',
      'esri/widgets/Expand',
      'esri/core/watchUtils'
    ])
      .then(([GeoJSONLayer]) => {
        let initLayer = new GeoJSONLayer({
          url: `https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27%20AND%20cmplnt_fr_tm%20between%20%27${props.currentHour -
            1}:00:00%27%20and%20%27${props.currentHour +
            1}:15:00%27&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon&$limit=50000`,
          renderer: heatMapRenderer,
          title: 'Crime Heat Map'
        })
        setLayer(initLayer)
        props.map.add(initLayer)

        props.view.when().then(function() {
          const simpleRenderer = {
            type: 'simple',
            symbol: {
              type: 'simple-marker',
              color: '#c80000',
              size: 10
            }
          }
          props.view.watch('scale', function(newValue) {
            initLayer.renderer =
              newValue <= 10000 ? simpleRenderer : heatMapRenderer
          })
        })
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default CrimeHeat
