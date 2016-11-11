const initialState = {
  isFetching: true,
  quoteData: {}
}

const stock = (state = initialState, action) => {
  if (action.error) return ({ ...state, error: action.error })

  switch (action.type) {
    case 'FETCHING_STOCK_DATA':
      return {
        ...state,
        isFetching: action.payload
      }
    case 'GET_STOCK_QUOTE':
      return Object.assign({}, state, {
        isFetching: false,
        quoteData: action.payload
      })
    default:
      return state
  }
}

export default stock
