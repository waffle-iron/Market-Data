import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/StockDetails'

const StockDetails = (props) => {
  if (props.Message) return alert(props.Message)

  return (
    <div>
        <h5>{ props.Symbol } {props.Name}</h5>
        <h6>${ props.LastPrice.toFixed(2) } &nbsp; { props.Change.toFixed(2) }%</h6>
      <span>
        <a className='btn waves-effect blue-grey lighten-4' styleName='btn'
          onClick={props.onClick} value='buy'>
          <i className='material-icons'>check</i>
        </a>
        <a className='btn waves-effect blue-grey lighten-4' styleName='btn'
          onClick={props.onClick} value='sell'>
          <i className='material-icons'>close</i>
        </a>
        <a className='btn waves-effect blue-grey lighten-4' styleName='btn'
          onClick={props.onClick} value='watch'>
          <i className='material-icons'>add</i>
        </a>
      </span>
    </div>
  )
}

StockDetails.propTypes = {
  Change: PropTypes.number.isRequired,
  LastPrice: PropTypes.number.isRequired,
  Message: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  Name: PropTypes.string.isRequired,
  Symbol: PropTypes.string.isRequired
}

export default CSSModules(StockDetails, Style)
