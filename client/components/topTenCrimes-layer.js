import {useState, useEffect} from 'react'
import {loadModules} from '@esri/react-arcgis'

const TopTenCrimes = props => {
  const [layer, setLayer] = useState(null)
  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/LabelClass'])
      .then(([FeatureLayer, LabelClass]) => {
        const verticalOffset = {
          screenLength: 50,
          maxWorldLength: 350,
          minWorldLength: 35
        }
        const iconSymbol = {
          type: 'point-3d', // autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: 'icon', // autocasts as new IconSymbol3DLayer()
              size: 12,
              material: {
                color: 'orange'
              },
              outline: {
                color: 'white',
                size: 1
              }
            }
          ],
          verticalOffset: verticalOffset,

          callout: {
            type: 'line', // autocasts as new LineCallout3D()
            color: 'white',
            size: 1,
            border: {
              color: 'white'
            }
          }
        }

        const iconSymbolRenderer = {
          type: 'simple', // autocasts as new SimpleRenderer()
          symbol: iconSymbol
        }

        var labelClass = new LabelClass({
          symbol: {
            type: 'label-3d', // autocasts as new LabelSymbol3D()
            symbolLayers: [
              {
                type: 'text', // autocasts as new TextSymbol3DLayer()
                material: {
                  color: 'white'
                },
                size: 14,
                halo: {
                  size: 1,
                  color: [50, 50, 50]
                }
              }
            ]
          },
          labelPlacement: 'above-center',
          labelExpressionInfo: {
            expression: 'DefaultValue($feature.TITLE, "no data")'
          }
        })

        const template = {
          title: '{TITLE}',
          content: [
            {
              type: 'text',
              text:
                '<p><b>Description:</b> {DESCRIPTION} </p> <b>Date:</b> {WHEN_:DateString(hideTime: true)}'
            },
            {
              type: 'media',
              mediaInfos: [
                {
                  type: 'image',
                  value: {
                    sourceURL: '{IMAGE_URL}'
                  }
                }
              ]
            }
          ]
        }

        let initLayer = new FeatureLayer({
          url:
            'https://services9.arcgis.com/UBBAhYgiEL7Yaa7P/arcgis/rest/services/top10_crimes/FeatureServer',
          renderer: iconSymbolRenderer,
          title: 'NYC Top Ten Murders',
          labelingInfo: [labelClass],
          popupEnabled: true,
          elevationInfo: {
            // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
            mode: 'relative-to-scene'
          },
          popupTemplate: template
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])

  return null
}

export default TopTenCrimes
