import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {PlayCircleOutline} from '@material-ui/icons'
import {Slider} from '@material-ui/lab'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    padding: 5,
    backgroundColor: 'white',
    position: 'fixed',
    bottom: '5%',
    right: '1%'
  },
  margin: {
    height: theme.spacing(1)
  },
  button: {
    color: 'blue',
    marginRight: '5%'
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

function DiscreteSlider(props) {
  const classes = useStyles()
  let hourPct = props.currentHourPct
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Time of Day
        <IconButton
          className={classes.button}
          aria-label="Play"
          disabled={props.currentHourPct > 99}
          size="medium"
          onClick={() => {
            if (hourPct < 99) {
              let int = setInterval(() => {
                if (hourPct > 91) clearInterval(int)
                hourPct = hourPct + 9.09
                props.changeTime(Math.round(24 * (hourPct / 100)))
              }, 3000)
            }
          }}
        >
          <PlayCircleOutline />
        </IconButton>
      </Typography>
      <div style={{display: 'flex'}}>
        <Slider
          className={classes.slider}
          valueLabelFormat={valueLabelFormat}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={marks}
          defaultValue={hourPct + 9.09}
          onChangeCommitted={(e, v) => {
            let hourOnSlider = Math.round(v / 100 * 24)
            let currentHour = Math.round(24 * (hourPct / 100))
            if ([0, 2, 4].includes(hourOnSlider)) {
              hourOnSlider += 1
            }
            if ([20, 22, 24].includes(hourOnSlider)) {
              hourOnSlider -= 1
            }
            if (hourOnSlider !== currentHour)
              return props.changeTime(hourOnSlider)
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

export default connect(mapStateToProps, null)(DiscreteSlider)
