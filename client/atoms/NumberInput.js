import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/atoms/NumberInput'

const NumberInput = (props) => {
  return (
    <div className='row' styleName='root'>
      <div className='input-field col s4'>
        <input className='validate' type='number'
          onChange={props.onChange} value={props.value} />
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default CSSModules(NumberInput, Style)
