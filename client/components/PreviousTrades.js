import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/PreviousTrades'

const PreviousTrades = (props) => {
  return (
    <div className='center' styleName='root'>
      <h3>Previous Trades</h3>
    </div>
  )
}

export default CSSModules(PreviousTrades, Style)
