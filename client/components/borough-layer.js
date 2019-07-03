import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Boroughs = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        let boroughRenderer = {
          type: 'simple',
          symbol: {
            type: 'simple-fill',
            color: [227, 139, 79, 0.8],
            outline: {
              color: [255, 255, 255],
              width: 1
            }
          },
          visualVariables: [
            {
              type: 'color',
              field: 'boro_code',
              stops: [
                {
                  value: 1,
                  color: '#9F1C1C',
                  label: 'Manhattan'
                },
                {
                  value: 2,
                  color: '#9F1C9F',
                  label: 'Bronx'
                },
                {
                  value: 3,
                  color: '#2887a1',
                  label: 'Brooklyn'
                },
                {
                  value: 4,
                  color: '#1C9F32',
                  label: 'Queens'
                },
                {
                  value: 5,
                  color: '#E2ED41',
                  label: 'Staten Island'
                }
              ]
            }
          ]
        }

        let initLayer = new FeatureLayer({
          url:
            'https://services8.arcgis.com/ZeG44A1dK4TLLucO/arcgis/rest/services/Neighborhood_Tabulation_Areas/FeatureServer',
          renderer: boroughRenderer,
          title: 'NYC Boroughs',
          visible: false
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])

  return null
}

export default Boroughs
