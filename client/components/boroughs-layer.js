import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'
import {changeBoroThunk} from '../store'
import {connect} from 'react-redux'

const BoroughsLayer = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        const boroughCoords = {
          Brooklyn: [40.6782, -73.9442],
          Manhattan: [40.7831, -73.9712],
          Queens: [40.7174, -73.8743],
          'Staten Island': [40.5795, -74.1502],
          Bronx: [40.8448, -73.8648]
        }

        const paneDiv = document.createElement('div')
        paneDiv.id = 'paneDiv'
        paneDiv.setAttribute(
          'style',
          'position:absolute; display:flex; margin-left:80px; top:13px; width: 50%; text-align:center; background-color: transparent'
        )
        document.body.appendChild(paneDiv)

        for (let i = 0; i < 5; i++) {
          let button = document.createElement('button')
          button.className = 'esri-button esri-button-overwrite boroughs'
          button.setAttribute(
            'style',
            'width:12%; display:table-cell; margin:4px; background-color: #242424; color: #69dcff; font-family: "Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif; border:0; font-weight: bold'
          )
          paneDiv.appendChild(button)
        }

        const boroughButtons = document.getElementsByClassName('boroughs')

        boroughButtons[0].innerText = 'Brooklyn'
        boroughButtons[1].innerText = 'Manhattan'
        boroughButtons[2].innerText = 'Queens'
        boroughButtons[3].innerText = 'Staten Island'
        boroughButtons[4].innerText = 'Bronx'

        props.view.ui.add(paneDiv)

        let initLayer = new FeatureLayer({
          url:
            'https://services9.arcgis.com/UBBAhYgiEL7Yaa7P/ArcGIS/rest/services/boroughs/FeatureServer',
          visible: false,
          legendEnabled: false,
          listMode: 'hide'
        })

        props.view.when(function() {
          for (let i = 0; i < boroughButtons.length; i++) {
            boroughButtons[i].addEventListener('click', onClick)
          }

          let queryBoroughs = initLayer.createQuery()

          function onClick(event) {
            queryBoroughs.where = event.target.innerText

            initLayer.queryExtent().then(function(results) {
              results.extent.center.latitude =
                boroughCoords[queryBoroughs.where][0]
              results.extent.center.longitude =
                boroughCoords[queryBoroughs.where][1]

              props.view.goTo(
                {
                  target: results.extent.center,
                  tilt: 70
                },
                {
                  duration: 2000,
                  easing: 'in-out-expo'
                }
              )
            })
            props.changeBoro(event.target.innerText.toUpperCase())
          }
        })

        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])

  return null
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    changeBoro: newTime => dispatch(changeBoroThunk(newTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoroughsLayer)
