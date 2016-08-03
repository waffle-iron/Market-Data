const initialState = {
    isFetching: true,
    quoteData: {}
}

const stock = (state = initialState, action) => {
    switch (action.type) {
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
