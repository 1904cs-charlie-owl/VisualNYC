import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {PlayCircleOutline} from '@material-ui/icons'
import Slider from './customSlider/Slider'
import Typography from '@material-ui/core/Typography'
import marks, {days} from '../timeMarks'
import {newDay} from '../store'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(7),
    height: 150,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: 'rgba(255, 255, 255, 0.7)'
  },
  button: {
    color: '#69dcff',
    marginRight: '5%'
  },
  header: {
    marginBottom: theme.spacing(2)
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

function DaySlider(props) {
  const [dow, setDow] = useState(props.mapView.day)
  useEffect(
    () => {
      props.newDay(dow)
    },
    [dow]
  )

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography
        id="discrete-slider-restrict"
        gutterBottom
        className={classes.header}
      >
        Day of Week
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
