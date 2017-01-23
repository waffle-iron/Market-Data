import React, { Component } from 'react'
import { connect } from 'react-redux'
import { create } from 'guid'
import CSSModules from 'react-css-modules'

import { getStockQuote, stockAction } from '../actions/stockActions'
import { getUserDashboard, logoutUser } from '../actions/userActions'

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
      stockSymbol: '',
      shares: 0,
      view: 'portfolio'
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getUserDashboard())
  }
  handleSharesChange = (e) => {
    this.setState({ shares: e.target.value })
  }
  handleStockAction = (e) => {
    const { dispatch, quoteData } = this.props
    const { LastPrice, Name, Symbol } = quoteData

    if (this.state.shares < 1) return alert('Must buy at least one share')

    const data = {
      name: Name,
      symbol: Symbol,
      shares: this.state.shares,
      price: LastPrice
    }
    console.log(e.target.name)
    dispatch(stockAction(e.target.name, data))
    this.setState({ shares: 0 })
  }
  handleSubmit = (e) => {
    const { stockSymbol } = this.state
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(getStockQuote(stockSymbol))
    this.setState({ stockSymbol: '' })
  }
  render() {
    const { stockSymbol, shares, view } = this.state
    const { dashboard, isFetching, loggedIn, portfolioItems, quoteData } = this.props
    const tabValues = ['trades', 'portfolio', 'watchlist']

    return (
      <div className='container'>
        <div className='center'>
          <StockForm onSubmit={this.handleSubmit}
            onChange={(e) => this.setState({ stockSymbol: e.target.value.toUpperCase() })}
            value={stockSymbol} />
          { !isFetching && loggedIn ? <StockDetails {...quoteData} onClick={this.handleStockAction} onChange={this.handleSharesChange} value={shares} /> : '' }
        </div>
        { !loggedIn ? '' : <PortfolioSummary {...dashboard} /> }
        <div className='container col s6'>
          <ul className='tabs tabs-fixed-width'>
            { tabValues.map(tab => <NavTab key={create().value} name={tab}
                onClick={(e) => this.setState({ view: e.target.name })}
                isActive={view === tab} />) }
          </ul>
        </div>
        <div>
          { view === 'portfolio' ? <Portfolio data={portfolioItems} /> : (view === 'trades' ? <PreviousTrades /> : <Watchlist />) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isFetching, portfolioItems, quoteData } = state.stock
  const { dashboard, loggedIn } = state.user
  return { dashboard, isFetching, loggedIn, portfolioItems, quoteData }
}

export default connect(mapStateToProps)(CSSModules(Dashboard, Style))
