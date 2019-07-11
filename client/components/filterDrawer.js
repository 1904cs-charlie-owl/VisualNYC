import React from 'react'
import {connect} from 'react-redux'
import {changeTimeThunk} from '../store'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import SeverityFilter from './severity-filter'
import CategoryFilter from './categoryFilter'
import CrimeSlider from './time-slider'
import DaySlider from './day-slider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const drawerWidth = '200'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#242424'
  },
  drawerHeader: {
    paddingTop: 22,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontWeight: 'bold'
  },
  drawerFooter: {
    display: 'flex',
    ...theme.mixins.toolbar
  }
}))

const FilterButton = props => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const toggleFilterDrawer = openState => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(openState)
  }
  const filterButton = document.createElement('button')
  filterButton.setAttribute(
    'style',
    'width:100px; height:32px; font-size:14px; background-color: #242424; color: #69dcff; border-width: 0px; font-weight: bold; display: flex; justify-content: center; align-items: center; padding-right:15px; font-family:"Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif'
  )

  filterButton.innerHTML = '<i class="material-icons">chevron_left</i>Filters'

  filterButton.onclick = function() {
    setOpen(!open)
  }
  if (props.mapView.initialLoad) props.view.ui.add(filterButton, 'top-right')

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleFilterDrawer(false)}
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerFooter}>
        <Typography
          className={classes.drawerHeader}
          id="time-of-day-slider"
          gutterBottom
        >
          Filters:
        </Typography>
        <IconButton
          onClick={toggleFilterDrawer(false)}
          style={{
            color: '#69dcff',
            paddingTop: 0,
            paddingBottom: 0,
            marginLeft: 'auto'
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>

      <SeverityFilter />
      <CategoryFilter />
      <CrimeSlider changeTime={props.changeTime} />
      <DaySlider changeTime={props.changeTime} />
    </Drawer>
  )
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    changeTime: newTime => dispatch(changeTimeThunk(newTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton)
