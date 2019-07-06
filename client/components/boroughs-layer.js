import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const BoroughsLayer = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer', 'esri/WebScene'])
      .then(([FeatureLayer]) => {
        // let boroughRenderer = {
        //   type: 'simple',
        //   symbol: {
        //     type: 'simple-marker',
        //     color: '#c80000',
        //     size: 10
        //   }
        // }

        let initLayer = new FeatureLayer({
          url:
            'https://services9.arcgis.com/UBBAhYgiEL7Yaa7P/arcgis/rest/services/boroughs/FeatureServer'
        })

        // var highlightSelect
        const boroughCoords = {
          Brooklyn: [40.6782, -73.9442],
          Manhattan: [40.7831, -73.9712],
          Queens: [40.782, -73.7949],
          'Staten Island': [40.5795, -74.1502],
          Bronx: [40.8448, -73.8648]
        }
        props.view.when(function() {
          let buttons = document.getElementsByClassName('boroughs')

          for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', onClick)
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
          }
        })

        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])

  return null
}

export default BoroughsLayer
