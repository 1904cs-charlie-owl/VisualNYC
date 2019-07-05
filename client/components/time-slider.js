import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {PlayCircleOutline} from '@material-ui/icons'
import {Slider} from '@material-ui/lab'
import Typography from '@material-ui/core/Typography'
import marks from '../timeMarks'

const useStyles = makeStyles(theme => ({
  root: {
    height: 300,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: 'rgba(255, 255, 255, 0.7)'
  },
  margin: {
    height: theme.spacing(1)
  },
  button: {
    color: '#69dcff',
    marginRight: '5%'
  }
}))

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1
}

const getHourPct = currentHour => {
  let hours = marks.map(el => el.value)
  let currentHourPct = 100 - currentHour / 22 * 100
  return hours.filter(
    el => currentHourPct >= el && currentHourPct < el + 9.09
  )[0]
}

const getHour = pct => {
  let hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
  let hour = Math.floor(24 * (pct / 100))
  return hours.filter(el => hour >= el && hour < el + 2)[0]
}

function DiscreteSlider(props) {
  const [hourPct, setHourPct] = useState(getHourPct(props.mapView.currentHour))
  useEffect(
    () => {
      props.changeTime(getHour(hourPct))
    },
    [hourPct]
  )
  let pct = hourPct

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Time of Day
        <IconButton
          className={classes.button}
          aria-label="Play"
          disabled={hourPct < 9}
          size="medium"
          onClick={() => {
            if (pct > 9) {
              let int = setInterval(() => {
                if (pct < 9) clearInterval(int)
                pct = pct - 9.09
                setHourPct(pct)
              }, 2000)
            }
          }}
        >
          <PlayCircleOutline />
        </IconButton>
      </Typography>
      <div style={{height: '100%'}}>
        <Slider
          className={classes.slider}
          aria-labelledby="vertical-slider"
          min={0}
          max={99.99}
          step={null}
          marks={marks}
          onChange={(e, v) => setHourPct(v)}
          value={hourPct}
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
