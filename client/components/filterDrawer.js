import React from 'react'
import {connect} from 'react-redux'
import {toggleHideFilter, changeTimeThunk} from '../store'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import SeverityFilter from './severity-filter'
import CrimeSlider from './time-slider'
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
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontWeight: 'bold'
  },
  drawerFooter: {
    display: 'flex',
    marginTop: 'auto',
    ...theme.mixins.toolbar
  }
}))

const FilterButton = props => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const toggleFilterDrawer = openState => event => {
    console.log('toggling')
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
    'width:32px; height:32px;font-size:.85em; background-color: #242424; color: #69dcff; border-width: 0px; font-weight: bold; display: flex; justify-content: center'
  )
  filterButton.innerHTML = '<i class="material-icons">chevron_left</i>'
  filterButton.onclick = function() {
    setOpen(!open)
  }
  if (props.mapView.initialLoad) props.view.ui.add(filterButton, 'bottom-right')

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
      <Typography
        className={classes.drawerHeader}
        id="time-of-day-slider"
        gutterBottom
      >
        Filters:
      </Typography>
      <SeverityFilter />
      <CrimeSlider changeTime={props.changeTime} />
      <div className={classes.drawerFooter}>
        <IconButton
          onClick={toggleFilterDrawer(false)}
          style={{color: '#69dcff'}}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFilters: () => dispatch(toggleHideFilter()),
    changeTime: newTime => dispatch(changeTimeThunk(newTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton)
