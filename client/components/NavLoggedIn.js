import React, { PropTypes } from 'react'

import NavItem from '../atoms/NavItem'

const NavLoggedIn = (props) => {
  return (
    <div>
      <NavItem to='/dashboard' text='Dashboard' />
      <li><a>{ props.user }</a></li>
      <li><a onClick={props.onClick}>Log Out</a></li>
    </div>
  )
}

NavLoggedIn.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.string
}

export default NavLoggedIn
