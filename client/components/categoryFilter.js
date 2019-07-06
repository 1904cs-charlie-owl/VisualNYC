import React from 'react'
import {connect} from 'react-redux'
import {changeLoadStatus, changeCategoryFilter} from '../store'
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
    marginTop: theme.spacing(4)
  },
  label: {
    height: 30
  },
  header: {
    marginBottom: 5
  }
}))

const CategoryFilter = props => {
  const classes = useStyles()
  const selectedCategories = props.mapView.categoryFilter
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.header} component="legend">
          Crime Category
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={selectedCategories.HOMICIDE}
                onChange={e => {
                  e.persist()
                  props.changeCategoryFilter('HOMICIDE', e.target.checked)
                }}
                value="HOMICIDE"
              />
            }
            label="Homicide"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={selectedCategories.SEXCRIME}
                onChange={e => {
                  e.persist()
                  props.changeCategoryFilter('SEXCRIME', e.target.checked)
                }}
                value="SEXCRIME"
              />
            }
            label="Sex Crime"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={selectedCategories.THEFTFRAUD}
                onChange={e => {
                  e.persist()
                  props.changeCategoryFilter('THEFTFRAUD', e.target.checked)
                }}
                value="THEFTFRAUD"
              />
            }
            label="Theft/Fraud"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={selectedCategories.OTHERVIOLENT}
                onChange={e => {
                  e.persist()
                  props.changeCategoryFilter('OTHERVIOLENT', e.target.checked)
                }}
                value="OTHERVIOLENT"
              />
            }
            label="Other Violent Crime"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={selectedCategories.DRUGS}
                onChange={e => {
                  e.persist()
                  props.changeCategoryFilter('DRUGS', e.target.checked)
                }}
                value="DRUGS"
              />
            }
            label="Drug Crime"
          />
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={selectedCategories.OTHER}
                onChange={e => {
                  e.persist()
                  props.changeCategoryFilter('OTHER', e.target.checked)
                }}
                value="OTHER"
              />
            }
            label="Other Crime"
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
    changeCategoryFilter: (name, event) =>
      dispatch(changeCategoryFilter(name, event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
