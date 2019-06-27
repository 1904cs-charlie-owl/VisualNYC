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
    },
    visualVariables: [
      {
        // specifies a visual variable of continuous color
        type: 'color',
        // based on a field indicating the walking time to public transport
        field: 'walkTimeToStopsInService',
        legendOptions: {
          title: 'Walking time to public transport'
        },
        // color ramp from white to blue
        // based on the walking time to public transport.
        // Buildings will be assigned a color proportional to the
        // min and max colors specified below.
        stops: [
          {
            value: 1,
            color: '#2887a1',
            label: 'less than 1 minute'
          },
          {
            value: 15,
            color: '#ffffff',
            label: 'more than 15 minutes'
          }
        ]
      }
    ]
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
