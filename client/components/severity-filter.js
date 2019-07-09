import React from 'react'
import {connect} from 'react-redux'
import {changeLoadStatus, changeClassFilter} from '../store'
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
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2)
  },
  label: {
    height: 30
  },
  header: {
    marginBottom: 5
  }
}))

const SeverityFilter = props => {
  const classes = useStyles()
  const selectedClasses = props.mapView.classFilter
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.header} component="legend">
          Crime Class
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            className={classes.label}
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
            className={classes.label}
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
            className={classes.label}
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
}

const mapStateToProps = state => {
  let mapView = state.view
  return {mapView}
}

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: () => dispatch(changeLoadStatus()),
    changeFilter: (name, event) => dispatch(changeClassFilter(name, event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeverityFilter)
