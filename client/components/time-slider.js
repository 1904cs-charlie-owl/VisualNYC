import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {PlayCircleOutline} from '@material-ui/icons'
import Slider from './customSlider/Slider'
import Typography from '@material-ui/core/Typography'
import marks from '../timeMarks'

const useStyles = makeStyles(theme => ({
  root: {
    height: 150,
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: theme.spacing(2)
  },
  button: {
    color: '#69dcff',
    marginRight: '5%'
  },
  rail: {
    opacity: 0.38
  },
  track: {
    opacity: 0.38
  },
  markLabel: {
    color: theme.palette.text.secondary
  },
  markLabelActive: {
    color: theme.palette.text.primary
  }
}))

const getHour = hour => {
  let hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
  return hours.filter(el => hour >= el && hour < el + 2)[0]
}

function DiscreteSlider(props) {
  const [hour, setHour] = useState(getHour(props.mapView.currentHour))
  let current = hour
  useEffect(
    () => {
      props.changeTime(getHour(current))
    },
    [current]
  )

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography id="time-of-day-slider" gutterBottom>
        Time of Day
        <IconButton
          className={classes.button}
          aria-label="Play"
          disabled={current > 20}
          size="medium"
          onClick={() => {
            if (current < 22) {
              let int = setInterval(() => {
                if (current > 18) clearInterval(int)
                current = current + 2
                setHour(getHour(current))
              }, 2000)
            }
          }}
        >
          <PlayCircleOutline />
        </IconButton>
      </Typography>
      <div style={{height: '100%'}}>
        <Slider
          classes={{
            rail: classes.rail,
            track: classes.track,
            markLabel: classes.markLabel,
            markLabelActive: classes.markLabelActive
          }}
          aria-labelledby="vertical-slider"
          min={-22}
          max={0}
          step={null}
          marks={marks}
          onChange={(e, v) => setHour(getHour(v * -1))}
          value={current * -1}
          orientation="vertical"
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
