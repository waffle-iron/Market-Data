import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/atoms/Btn'

const Btn = (props) => {
  return (
    <button onClick={props.onClick} name={props.name} value={props.value}>
      { props.text }
    </button>
  )
}

export default CSSModules(Btn, Style)
