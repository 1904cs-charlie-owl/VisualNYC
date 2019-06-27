import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Crimes = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        let crimeHeadsRenderer = {
          type: 'simple',
          symbol: {
            type: 'picture-marker',
            url:
              'http://static.arcgis.com/images/Symbols/SafetyHealth/Burglary.png',
            width: '18px',
            height: '18px'
          }
        }

        let initLayer = new FeatureLayer({
          url:
            'https://services9.arcgis.com/pI8WB6ioL0sQBuuC/arcgis/rest/services/test_crime_data/FeatureServer',
          renderer: crimeHeadsRenderer
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Crimes
