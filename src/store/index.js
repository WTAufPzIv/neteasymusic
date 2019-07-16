import { createStore, applyMiddleware } from 'redux'
import neteasecloudmusic  from './app'
import thunk from 'redux-thunk'
let store = createStore(neteasecloudmusic,applyMiddleware(thunk))
export default store