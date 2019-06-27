import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Crimes = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/GeoJSONLayer'])
      .then(([GeoJSONLayer]) => {
        const geoJSONLayer = new GeoJSONLayer({
          url:
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
          copyright: 'USGS Earthquakes'
        })
        setLayer(geoJSONLayer)
        props.map.add(geoJSONLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Crimes
