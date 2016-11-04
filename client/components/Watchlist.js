import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/Watchlist'

const Watchlist = (props) => {
  return (
    <div className='center' styleName='root'>
      <h3>Watchlist</h3>
    </div>
  )
}

export default CSSModules(Watchlist, Style)
