import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const LayerListWidget = props => {
  const [widgets, setWidgets] = useState(null)
  useEffect(() => {
    loadModules([
      'esri/widgets/LayerList',
      'esri/widgets/Expand',
      'esri/widgets/Locate',
      'esri/core/watchUtils',
      'esri/widgets/Legend',
      'esri/widgets/Search',
      'esri/widgets/BasemapGallery'
    ])
      .then(
        ([
          LayerList,
          Expand,
          Locate,
          watchUtils,
          Legend,
          Search,
          BasemapGallery
        ]) => {
          props.view.when(function() {
            var searchBtn = new Search({
              view: props.view
            })
            var searchExpand = new Expand({
              view: props.view,
              content: searchBtn
            })
            props.view.ui.add(searchExpand, 'top-left')

            var layerList = new LayerList({
              view: props.view
            })
            var expand = new Expand({
              view: props.view,
              content: layerList
            })
            props.view.ui.add(expand, 'top-left')
            var locateBtn = new Locate({
              view: props.view
            })
            props.view.ui.add(locateBtn, {
              position: 'top-left'
            })

            var legend = new Legend({
              view: props.view,
              container: 'legend'
            })
            props.view.ui.add(legend, 'bottom-left')

            var basemap = new BasemapGallery({
              view: props.view
            })

            var baseExpand = new Expand({
              view: props.view,
              content: basemap
            })
            props.view.ui.add(baseExpand, 'top-left')

            const sampleInstructions = document.createElement('div')
            sampleInstructions.style.padding = '10px'
            sampleInstructions.style.backgroundColor = 'black'
            sampleInstructions.style.width = '300px'
            sampleInstructions.innerText = [
              'Historical activity shows crimes committed in a two hour window occurring on the same weekday. Source: 2018 NYC Crime Open Data. '
            ].join(' ')

            const instructionsExpand = new Expand({
              expandIconClass: 'esri-icon-question',
              expandTooltip: 'How to use this sample',
              expanded: false,
              view: props.view,
              content: sampleInstructions
            })
            props.view.ui.add(instructionsExpand, 'top-left')

            // Hide the instructions when the user starts interacting with the sample

            watchUtils.whenTrueOnce(props.view, 'interacting', function() {
              instructionsExpand.expanded = false
            })
          })
        }
      )
      .catch(err => console.error(err))
  }, [])
  return null
}

export default LayerListWidget
