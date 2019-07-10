import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import axios from 'axios'
import {changeBoroThunk} from '../store'
import {connect} from 'react-redux'

const WidgetLayer = props => {
  const [widgets, setWidgets] = useState(null)
  useEffect(() => {
    loadModules([
      'esri/widgets/LayerList',
      'esri/widgets/Expand',
      'esri/widgets/Locate',
      'esri/core/watchUtils',
      'esri/widgets/Legend',
      'esri/widgets/Search',
      'esri/widgets/BasemapGallery',
      'esri/tasks/Locator',
      'esri/geometry/SpatialReference',
      'esri/geometry/Point'
    ])
      .then(
        ([
          LayerList,
          Expand,
          Locate,
          watchUtils,
          Legend,
          Search,
          BasemapGallery,
          Point
        ]) => {
          props.view.when(function() {
            var searchBtn = new Search({
              view: props.view
            })
            searchBtn.on('select-result', async function(evt) {
              const lat = parseFloat(evt.result.feature.geometry.latitude)
              const lon = parseFloat(evt.result.feature.geometry.longitude)
              const tokenRes = await axios.post(
                'https://locatenyc.io/arcgis/tokens/generateToken?username=mikejoesis&password=*Buddy0ne12345&expiration=1440'
              )
              const token = tokenRes.data.token
              axios
                .get(
                  `https://locatenyc.io/arcgis/rest/services/locateNYC/v1/GeocodeServer/reverseGeocode?location=${lon}%2C${lat}&distance=100&outSR=4326&f=pjson&token=${token}`
                )
                .then(res => {
                  console.log(res)
                  props.changeBoro(res.data.address.Borough.toUpperCase())
                })
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

            let legendDiv = document.createElement('div')
            legendDiv.id = 'legend'
            legendDiv.setAttribute('style', 'margin-right:25%')
            document.body.appendChild(legendDiv)

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
            sampleInstructions.style.backgroundColor = '#242424'
            sampleInstructions.style.width = '300px'
            sampleInstructions.innerText = [
              'Historical activity shows crimes committed in a two hour window occurring on the same weekday. Source: 2018 NYC Crime Open Data. '
            ].join(' ')

            const instructionsExpand = new Expand({
              expandIconClass: 'esri-icon-question',
              expandTooltip: 'Click here for data information.',
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

const mapDispatchToProps = dispatch => {
  return {
    changeBoro: newTime => dispatch(changeBoroThunk(newTime))
  }
}

export default connect(null, mapDispatchToProps)(WidgetLayer)
