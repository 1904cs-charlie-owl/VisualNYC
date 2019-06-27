import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const Boroughs = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/SceneLayer'])
      .then(([SceneLayer]) => {
        var initLayer = new SceneLayer({
          portalItem: {
            id: '2e0761b9a4274b8db52c4bf34356911e'
          },
          popupEnabled: false
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default Boroughs
