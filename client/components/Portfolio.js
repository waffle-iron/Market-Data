import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/Portfolio'

const Portfolio = (props) => {
  return (
    <div className='center' styleName='root'>
      <h3>Portfolio</h3>
    </div>
  )
}

export default CSSModules(Portfolio, Style)
