import axios from 'axios'

const axiosConfig = {
  baseURL: 'http://localhost:8080/',
  withCredentials: true
}

export const isFetching = (bool) => {
  return { type: 'FETCHING_STOCK_DATA', payload: bool }
}

const getStockQuoteSuccess = (payload) => {
  return { type: 'GET_STOCK_QUOTE', payload }
}

const getStockQuoteFail = (error) => {
  return { type: 'GET_STOCK_QUOTE', error }
}

export const getStockQuote = (symbol) => {
  const endPoint = `/v1/stock/${symbol}`

  return dispatch => {
    axios.get(endPoint, axiosConfig)
      .then(response => dispatch(getStockQuoteSuccess(response.data)))
      .catch(error => dispatch(getStockQuoteFail(error.data)))
  }
}

const getStockChartSuccess = (payload) => {
  return { type: 'GET_STOCK_CHART', payload }
}

const getStockChartFail = (error) => {
  return { type: 'GET_STOCK_CHART', error }
}

export const getStockChart = (symbol) => {
  const endPoint = `/v1/stock/chart/${symbol}`

  return dispatch => {
    axios.get(endPoint, axiosConfig)
      .then(response => dispatch(getStockChartSuccess(response.data)))
      .catch(error => dispatch(getStockChartFail(error.data)))
  }
}

const stockActionSuccess = (action, payload) => {
  const stockAction = action.toUpperCase()
  return { type: `${stockAction}_STOCK_SYMBOL_SUCCESS`, payload }
}

const stockActionFail = (action, error) => {
  const stockAction = action.toUpperCase()
  return { type: `${stockAction}_STOCK_SYMBOL_FAIL`, error }
}

const stockAction = (action, symbol) => {
  const endPoint = `/v1/stock/${action}/${symbol}`

  return dispatch => {
    axios.post(endPoint, symbol, axiosConfig)
      .then(response => dispatch(stockActionSuccess(action, response.data)))
      .catch(error => dispatch(stockActionFail(action, error.data)))
  }
}
