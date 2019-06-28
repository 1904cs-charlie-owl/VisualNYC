import React from 'react'
import PropTypes from 'prop-types'
import {withStyles, makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Slider} from '@material-ui/lab'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    padding: 24
  },
  margin: {
    height: theme.spacing(1)
  }
}))

const marks = [
  {
    value: 0,
    label: '12 AM - 2 AM'
  },
  {
    value: 9.09,
    label: '2AM - 4AM'
  },
  {
    value: 18.18,
    label: '4AM - 6AM'
  },
  {
    value: 27.27,
    label: '6AM - 8AM'
  },
  {
    value: 36.36,
    label: '8AM - 10AM'
  },
  {
    value: 45.45,
    label: '10AM - 12PM'
  },
  {
    value: 54.54,
    label: '12PM - 2PM'
  },
  {
    value: 63.63,
    label: '2PM - 4PM'
  },
  {
    value: 72.72,
    label: '4PM - 6PM'
  },
  {
    value: 81.81,
    label: '6PM - 8PM'
  },
  {
    value: 90.9,
    label: '8PM - 10PM'
  },
  {
    value: 99.99,
    label: '10PM - 12AM'
  }
]

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1
}

export default function DiscreteSlider(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Restricted values
      </Typography>
      <Slider
        defaultValue={props.currentHourPct}
        valueLabelFormat={valueLabelFormat}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={marks}
        onChange={(e, v) => {
          return props.changeTime(Math.round(24 * (v / 100)))
        }}
      />
    </div>
  )
}
