import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Boroughs = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        var initLayer = new FeatureLayer({
          url:
            'https://services8.arcgis.com/ZeG44A1dK4TLLucO/arcgis/rest/services/Neighborhood_Tabulation_Areas/FeatureServer'
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Boroughs
