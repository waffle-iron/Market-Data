import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'

import NavDesktop from './NavDesktop'
import NavItem from '../atoms/NavItem'
import NavMobile from './NavMobile'

import Style from '../styles/components/NavBar'

const NavBar = (props) => {
  return (
    <nav className='blue-grey lighten-4' role='navigation'>
      <div className='nav-wrapper container'>
        <Link id='logo-container' to='/' className='brand-logo'>
          <i className='material-icons'>polymer</i>
        </Link>
        <NavDesktop loggedIn={false} onClick={props.onClick} />
        <NavMobile loggedIn={false} onClick={props.onClick} />
      </div>
    </nav>
  )
}

export default CSSModules(NavBar, Style)
