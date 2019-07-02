import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import {PlayCircleOutline} from '@material-ui/icons'
import {TextField} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    width: '15%',
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
    value: '01:00',
    label: '12 AM - 2 AM'
  },
  {
    value: '03:00',
    label: '2AM - 4AM'
  },
  {
    value: '05:00',
    label: '4AM - 6AM'
  },
  {
    value: '07:00',
    label: '6AM - 8AM'
  },
  {
    value: '09:00',
    label: '8AM - 10AM'
  },
  {
    value: '11:00',
    label: '10AM - 12PM'
  },
  {
    value: '13:00',
    label: '12PM - 2PM'
  },
  {
    value: '15:00',
    label: '2PM - 4PM'
  },
  {
    value: '17:00',
    label: '4PM - 6PM'
  },
  {
    value: '19:00',
    label: '6PM - 8PM'
  },
  {
    value: '21:00',
    label: '8PM - 10PM'
  },
  {
    value: '23:00',
    label: '10PM - 12AM'
  }
]

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
        <TextField
          value={marks}
          onChange={(e, v) => {
            console.log(e, v)
            props.changeTime(v)
          }}
          type="time"
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
