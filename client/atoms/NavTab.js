import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/atoms/NavTab'

const NavTab = (props) => {
    const isActive = props.isActive ? 'root-active' : 'root'

    return (
        <li styleName={isActive}>
            <a onClick={props.onClick} value={props.value}>
                { props.name }
            </a>
        </li>
    )
}

export default CSSModules(NavTab, Style)
