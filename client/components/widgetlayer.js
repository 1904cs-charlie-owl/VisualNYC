import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const WidgetLayer = props => {
  const [widget, setWidget] = useState(null)
  useEffect(() => {
    loadModules([
      'esri/widgets/LayerList',
      'esri/widgets/Expand',
      'esri/widgets/Locate',
      'esri/widgets/Search'
    ])
      .then(([LayerList, Expand, Locate, Search]) => {
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
          var searchBtn = new Search({
            view: props.view
          })
          props.view.ui.add(searchBtn, {
            position: 'bottom-right'
          })
        })
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default WidgetLayer
