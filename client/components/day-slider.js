import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {PlayCircleOutline} from '@material-ui/icons'
import {Slider} from '@material-ui/lab'
import Typography from '@material-ui/core/Typography'
import marks, {days} from '../timeMarks'
import {newDay} from '../store'

const useStyles = makeStyles(theme => ({
  root: {
    height: 300,
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: 'white'
  },
  margin: {
    height: theme.spacing(1)
  },
  button: {
    color: '#69dcff',
    marginRight: '5%'
  }
}))

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

function DaySlider(props) {
  const [dow, setDow] = useState(props.mapView.day)
  useEffect(
    () => {
      props.newDay(dow)
    },
    [dow]
  )
  //let pct = hourPct

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Day of Week
      </Typography>
      <div style={{height: '100%'}}>
        <Slider
          className={classes.slider}
          aria-labelledby="vertical-slider"
          min={-6}
          max={0}
          step={null}
          marks={days}
          onChange={(e, v) => setDow(v * -1)}
          value={dow * -1}
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

const mapDispatchToProps = dispatch => {
  return {
    newDay: day => dispatch(newDay(day))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaySlider)
