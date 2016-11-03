import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/StockForm'

const StockForm = (props) => {
  return (
    <form className='col s6' onSubmit={props.onSubmit}>
      <div className='row'>
        <div className='input-field col s12'>
          <input className='validate' styleName='symbol-input' type='text'
            onChange={props.onChange} value={props.value} />
        </div>
      </div>
    </form>
  )
}

export default CSSModules(StockForm, Style)
