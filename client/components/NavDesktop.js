import React, { PropTypes } from 'react'

import NavItem from '../atoms/NavItem'

const NavDesktop = (props) => {
  return (
    <ul className='right hide-on-med-and-down'>
      {
        props.loggedIn ? <NavItem to='/dashboard' text='Dashboard' /> :
        <div>
          <li><a href='#' onClick={props.onClick} value='login'>Login</a></li>
          <li><a href='#' onClick={props.onClick} value='signup'>Sign Up</a></li>
        </div>
      }
    </ul>
  )
}

NavDesktop.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

export default NavDesktop
