import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const TopTenCrimes = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        let renderer = {
          type: 'simple',
          symbol: {
            type: 'simple-marker',
            color: '#c80000',
            size: 10
          }
        }

        let initLayer = new FeatureLayer({
          url:
            'https://services9.arcgis.com/UBBAhYgiEL7Yaa7P/arcgis/rest/services/top10_crimes/FeatureServer',
          renderer,
          title: 'NYC Top Ten Crimes'
          // visible: false
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])

  return null
}

export default TopTenCrimes
