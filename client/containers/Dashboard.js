import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import { getStockQuote } from '../actions/stockActions'

import StockForm from '../components/StockForm'
import StockDetails from '../components/StockDetails'
import Loader from '../atoms/Loader'

import Style from '../styles/containers/Dashboard'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            stockSymbol: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                isLoading: false
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            stockSymbol: e.target.value.toUpperCase()
        })
    }
    handleSubmit = (e) => {
        const { stockSymbol } = this.state
        const { dispatch } = this.props
        e.preventDefault()

        dispatch(getStockQuote(stockSymbol))
        this.setState({
            stockSymbol: ''
        })
    }
    render() {
        const { isLoading, stockSymbol } = this.state
        const { quoteData } = this.props

        return (
            <div styleName='root'>
                <h3>Stock Data</h3>
                <StockForm onSubmit={this.handleSubmit}
                    onChange={this.handleChange} value={stockSymbol} />
                { isLoading ? '' : <StockDetails {...quoteData} /> }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { quoteData } = state.stock
    return { quoteData }
}

export default connect(mapStateToProps)(CSSModules(Dashboard, Style))
