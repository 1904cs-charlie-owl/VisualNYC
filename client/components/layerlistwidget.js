import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const LayerList = props => {
  const [widget, setWidget] = useState(null)
  useEffect(() => {
    loadModules(['esri/widgets/LayerList'])
      .then(([LayerList]) => {
        props.view.when(function() {
          var layerList = new LayerList({
            view: props.view
          })
          setWidget(layerList)
          props.view.ui.add(layerList, 'top-right')
        })
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default LayerList
