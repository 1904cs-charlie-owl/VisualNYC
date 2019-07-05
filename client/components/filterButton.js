import React from 'react'
import {connect} from 'react-redux'
import {toggleHideFilter, changeTimeThunk} from '../store'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import SeverityFilter from './severity-filter'
import CrimeSlider from './time-slider'
import DaySlider from './day-slider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {makeStyles, useTheme} from '@material-ui/core/styles'

const drawerWidth = '10%'

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
    display: 'flex',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
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
    'width:32px; height:32px;font-size:.85em; background-color: #242424; color: #69dcff; border-width: 0px; font-weight: bold'
  )
  const icon = document.createElement('span')
  icon.className = 'esri-icon-left-triangle-arrow'
  filterButton.appendChild(icon)
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
    >
      <SeverityFilter />
      <CrimeSlider changeTime={props.changeTime} />
      <DaySlider changeTime={props.changeTime} />
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleFilterDrawer(false)}>
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
