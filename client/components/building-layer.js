import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Boroughs = props => {
  const [layer, setLayer] = useState(null)
  const renderer = {
    type: 'simple', // autocasts as new SimpleRenderer()
    // Add a default MeshSymbol3D. The color will be determined
    // by the visual variables
    symbol: {
      type: 'mesh-3d',
      symbolLayers: [
        {
          type: 'fill',
          material: {
            color: 'rgba(101, 212, 243, 0.5)',
            colorMixMode: 'replace'
          },
          edges: {
            type: 'solid',
            color: [0, 0, 0, 0.6],
            size: 1.5
          }
        }
      ]
    }
  }

  useEffect(() => {
    loadModules(['esri/layers/SceneLayer'])
      .then(([SceneLayer]) => {
        var initLayer = new SceneLayer({
          url:
            'https://tiles.arcgis.com/tiles/0p6i4J6xhQas4Unf/arcgis/rest/services/New_York_City_3D_Buildings_Optimized/SceneServer',
          renderer,
          title: '3D Building Models'
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Boroughs
