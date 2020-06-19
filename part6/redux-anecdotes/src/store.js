import { createStore, combineReducers } from 'redux'
import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes : anecdotesReducer,
    notif : notificationReducer,
    filter : filterReducer
})

const store = createStore(reducer)

export default store
