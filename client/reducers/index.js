import { combineReducers } from 'redux'

import counter from './counter'
import currency from './currency'
import stock from './stock'
import user from './user'

const rootReducer = combineReducers({
    counter,
    currency,
    stock,
    user
})

export default rootReducer
