const initialState = {
  isFetching: true,
  portfolioStocks: [],
  quoteData: {}
}

const stock = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'FETCHING_STOCK_DATA':
      return {
        ...state,
        isFetching: action.payload
      }
    case 'GET_STOCK_QUOTE_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        quoteData: action.payload
      })
    case 'GET_STOCK_QUOTE_FAIL':
      return state
    case 'WATCH_STOCK_SYMBOL_SUCCESS':
      return state
    case 'WATCH_STOCK_SYMBOL_FAIL':
      return state
    case 'BUY_STOCK_SYMBOL_SUCCESS':
      return {
        ...state,
        portfolioStocks: action.payload
      }
      return state
    case 'BUY_STOCK_SYMBOL_FAIL':
      return state
    case 'SELL_STOCK_SYMBOL_SUCCESS':
      return state
    case 'SELL_STOCK_SYMBOL_FAIL':
      return state
    default:
      return state
  }
}

export default stock
