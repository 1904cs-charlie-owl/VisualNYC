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
            color: '#ffffff',
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
          portalItem: {
            id: '2e0761b9a4274b8db52c4bf34356911e'
          },
          popupEnabled: false,
          renderer
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Boroughs
