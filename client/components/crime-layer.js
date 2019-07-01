import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Crimes = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/GeoJSONLayer'])
      .then(([GeoJSONLayer]) => {
        const geoJSONLayer = new GeoJSONLayer({
          url:
            'https://data.cityofnewyork.us/resource/9s4h-37hy.geojson?$where=cmplnt_fr_dt%20between%20%272018-01-01%27%20and%20%272018-12-31%27%20AND%20cmplnt_fr_tm%20between%20%2701:00:00%27%20and%20%2701:15:00%27&$select=CMPLNT_FR_DT,CMPLNT_FR_TM,LAW_CAT_CD,Lat_Lon&$limit=50000'
        })
        setLayer(geoJSONLayer)
        props.map.add(geoJSONLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Crimes
