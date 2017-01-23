import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/PortfolioSummary'

const PortfolioSummary = (props) => {
  return (
    <div className='container center'>
      <h3>{ props.name } Stats</h3>
      <ul>
        <li styleName='info-item'>Total Portfolio Worth: ${ props.funds }</li>
        <li styleName='info-item'>Capital: ${ props.funds }</li>
        <li styleName='info-item'># of trades last month: 10</li>
        <li styleName='info-item'>Profits last month: ${ props.funds * 0.03 }</li>
      </ul>
    </div>
  )
}

PortfolioSummary.propTypes = {
  funds: PropTypes.string,
  name: PropTypes.string
}

export default CSSModules(PortfolioSummary, Style)
