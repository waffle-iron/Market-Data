const initialState = {
  isFetching: true,
  quoteData: {}
}

const stock = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_STOCK_DATA':
      return {
        ...state,
        isFetching: action.payload
      }
    case 'GET_STOCK_QUOTE_DATA':
      return Object.assign({}, state, {
        isFetching: false,
        quoteData: action.payload
      })
    default:
      return state
  }
}

export default stock
