import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/StockForm'

const StockForm = (props) => {
  return (
    <form styleName='root' onSubmit={props.onSubmit}>
      <div className='row'>
        <div className='input-field col s4'>
          <input className='validate' type='text'
            onChange={props.onChange} value={props.value} />
        </div>
      </div>
    </form>
  )
}

StockForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default CSSModules(StockForm, Style)
