import React from 'react'

const StockDetails = (props) => {
    return (
        <div>
            <span>
                <h5>{ props.Symbol }  {props.Name}</h5>
            </span>
            <span>
                <h6>{ props.LastPrice } &nbsp; { props.Change }</h6>
            </span>
            <span>
                <a onClick={props.onClick} value='buy'>Buy</a>
                &nbsp;
                <a onClick={props.onClick} value='sell'>Sell</a>
                &nbsp;
                <a onClick={props.onClick} value='watch'>Watch</a>
            </span>
        </div>
    )
}

export default StockDetails
