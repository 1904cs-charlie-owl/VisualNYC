import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Crimes = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        var initLayer = new FeatureLayer({
          url:
            'https://services9.arcgis.com/pI8WB6ioL0sQBuuC/arcgis/rest/services/test_crime_data/FeatureServer'
        })
        console.log(initLayer)
        setLayer(initLayer)
        console.log(props)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Crimes
