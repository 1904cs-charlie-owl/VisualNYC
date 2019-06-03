import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, handleClick} = props
  console.log(props)
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
