import React, { Component } from 'react'
import { connect } from 'react-redux'
import { create } from 'guid'
import CSSModules from 'react-css-modules'

import { getStockQuote } from '../actions/stockActions'

import PortfolioSummary from '../components/PortfolioSummary'
import StockForm from '../components/StockForm'
import StockDetails from '../components/StockDetails'
import NavTab from '../atoms/NavTab'

import Style from '../styles/containers/Dashboard'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      stockSymbol: '',
      view: 'portfolio'
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        isLoading: false
      })
    }
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
    const { isLoading, stockSymbol, view } = this.state
    const { quoteData } = this.props
    const tabValues = [
      { name: 'Trades', value: 'trades' },
      { name: 'Portfolio', value: 'portfolio' },
      { name: 'Watchlist', value: 'watchlist' }
    ]

    return (
      <div styleName='root'>
        <h3>Stock Data</h3>
        <StockForm onSubmit={this.handleSubmit}
          onChange={(e) => this.setState({ stockSymbol: e.target.value.toUpperCase() })}
          value={stockSymbol} />
        { isLoading ? '' : <StockDetails {...quoteData} /> }
        <PortfolioSummary />
        <ul styleName='tab-list'>
          { tabValues.map(tab => <NavTab {...tab}
              key={create().value}
              onClick={(e) => this.setState({ view: e.target.value })}
              isActive={view === tab.value} />) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { quoteData } = state.stock
  return { quoteData }
}

export default connect(mapStateToProps)(CSSModules(Dashboard, Style))
