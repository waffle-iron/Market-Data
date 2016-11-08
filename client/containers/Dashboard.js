import React, { Component } from 'react'
import { connect } from 'react-redux'
import { create } from 'guid'
import CSSModules from 'react-css-modules'

import { getStockQuote } from '../actions/stockActions'

import NavTab from '../atoms/NavTab'
import Portfolio from '../components/Portfolio'
import PortfolioSummary from '../components/PortfolioSummary'
import PreviousTrades from '../components/PreviousTrades'
import StockForm from '../components/StockForm'
import StockDetails from '../components/StockDetails'
import Watchlist from '../components/Watchlist'

import Style from '../styles/containers/Dashboard'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symbolData: false,
      stockSymbol: '',
      view: 'portfolio'
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        symbolData: true
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
    const { stockSymbol, symbolData, view } = this.state
    const { quoteData } = this.props
    const tabValues = [
      { name: 'Trades', value: 'trades' },
      { name: 'Portfolio', value: 'portfolio' },
      { name: 'Watchlist', value: 'watchlist' }
    ]

    return (
      <div className='container'>
        <div className='center'>
          <StockForm onSubmit={this.handleSubmit}
            onChange={(e) => this.setState({ stockSymbol: e.target.value.toUpperCase() })}
            value={stockSymbol} />
          { symbolData ? <StockDetails {...quoteData} /> : '' }
        </div>
        <PortfolioSummary />
        <div className='container col s6'>
          <ul className='tabs tabs-fixed-width'>
            { tabValues.map(tab => <NavTab {...tab} key={create().value}
                onClick={(e) => this.setState({ view: e.target.value })}
                isActive={view === tab.value} />) }
          </ul>
        </div>
        <div>
          { view === 'portfolio' ? <Portfolio /> : (view === 'trades' ? <PreviousTrades /> : <Watchlist />) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { quoteData } = state.stock
  return { quoteData }
}

export default connect(mapStateToProps)(CSSModules(Dashboard, Style))
