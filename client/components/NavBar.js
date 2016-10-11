import React from 'react'
import CSSModules from 'react-css-modules'

import NavItem from '../atoms/NavItem'

import Style from '../styles/components/NavBar'

const NavBar = (props) => {
  return (
    <div styleName='root'>
      <NavItem to='/' itemName='Home' />
      <NavItem to='/dashboard' itemName='Dashboard' />
      <a styleName='nav-item' onClick={props.onClick} value='login'>Login</a>
      <a styleName='nav-item' onClick={props.onClick} value='signup'>Sign Up</a>
    </div>
  )
}

export default CSSModules(NavBar, Style)
