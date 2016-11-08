import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/atoms/NavTab'

const NavTab = (props) => {
  const isActive = props.isActive ? 'active' : ''

  return (
    <li className='tab col s4 blue-grey lighten-4'>
      <a  className={'blue-grey-text lighten-4 ' + isActive} onClick={props.onClick} value={props.value}>
        { props.name }
      </a>
    </li>
  )
}

NavTab.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default CSSModules(NavTab, Style)
