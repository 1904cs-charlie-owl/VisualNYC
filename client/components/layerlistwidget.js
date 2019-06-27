import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const LayerListWidget = props => {
  const [widget, setWidget] = useState(null)
  useEffect(() => {
    loadModules(['esri/widgets/LayerList', 'esri/widgets/Expand'])
      .then(([LayerList, Expand]) => {
        props.view.when(function() {
          var layerList = new LayerList({
            view: props.view
          })
          var expand = new Expand({
            view: props.view,
            content: layerList
          })
          setWidget(expand)
          props.view.ui.add(expand, 'top-right')
        })
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default LayerListWidget
