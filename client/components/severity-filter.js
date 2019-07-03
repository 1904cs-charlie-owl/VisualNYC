import React from 'react'
import {connect} from 'react-redux'
import {changeLoadStatus, changeFilter} from '../store'
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#242424',
    position: 'fixed',
    bottom: '18%',
    right: '3%',
    color: 'white'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

const SeverityFilter = props => {
  const classes = useStyles()
  const selectedClasses = props.mapView.crimeFilter
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Filter By Crime Class</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedClasses.felony}
                onChange={e => {
                  e.persist()
                  props.changeFilter('felony', e.target.checked)
                }}
                value="FELONY"
              />
            }
            label="Felony"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedClasses.misd}
                onChange={e => {
                  e.persist()
                  props.changeFilter('misd', e.target.checked)
                }}
                value="MISDEMEANOR"
              />
            }
            label="Misdemeanor"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedClasses.viol}
                onChange={e => {
                  e.persist()
                  props.changeFilter('viol', e.target.checked)
                }}
                value="VIOLATION"
              />
            }
            label="Violation"
          />
        </FormGroup>
      </FormControl>
    </div>
  )
  // const div = document.createElement('div');
  // div.innerHTML = sevFilter
  // if (props.mapView.initialLoad) props.view.ui.add(sevFilter, 'top-right')
  // if (props.mapView.initialLoad) props.initialLoad()
  // return <div />
}

// const createFilter = props => {
//   const node = document.createElement('div')
//   props.view.ui.add(node, 'top-right')
//   return <SeverityFilter />
// }

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: () => dispatch(changeLoadStatus()),
    changeFilter: (name, event) => dispatch(changeFilter(name, event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeverityFilter)
