import React from 'react'

import NavItem from '../atoms/NavItem'

const NavDesktop = (props) => {
  return (
    <ul className='right hide-on-med-and-down'>
      <NavItem to='/dashboard' text='Dashboard' />
      <li><a href='#' onClick={props.onClick} value='login'>Login</a></li>
      <li><a href='#' onClick={props.onClick} value='signup'>Sign Up</a></li>
    </ul>
  )
}

export default NavDesktop
