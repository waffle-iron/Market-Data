import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/PortfolioSummary'

const PortfolioSummary = (props) => {
  return (
    <div styleName='root'>
      <h3>Portfolio Stats</h3>
      <ul>
        <li styleName='info-item'>Total Portfolio Worth: $117,287</li>
        <li styleName='info-item'>Capital: $74,667</li>
        <li styleName='info-item'># of trades last month: 10</li>
        <li styleName='info-item'>Profits last month: $17,287</li>
      </ul>
    </div>
  )
}

export default CSSModules(PortfolioSummary, Style)
