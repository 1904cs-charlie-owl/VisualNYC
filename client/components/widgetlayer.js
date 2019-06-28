import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const WidgetLayer = props => {
  const [widget, setWidget] = useState(null)
  useEffect(() => {
    loadModules([
      'esri/widgets/LayerList',
      'esri/widgets/Expand',
      'esri/widgets/Locate'
    ])
      .then(([LayerList, Expand, Locate]) => {
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
          var locateBtn = new Locate({
            view: props.view
          })
          props.view.ui.add(locateBtn, {
            position: 'top-left'
          })
        })
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default WidgetLayer
