import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const CrimeHeat = props => {
  const [layer, setLayer] = useState(null)
  const renderer = {
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
    maxPixelIntensity: 12,
    minPixelIntensity: 0
  }

  useEffect(() => {
    loadModules(['esri/layers/GeoJSONLayer'])
      .then(([GeoJSONLayer]) => {
        let initLayer = new GeoJSONLayer({
          url:
            'https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon&$limit=10000',
          renderer
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default CrimeHeat
