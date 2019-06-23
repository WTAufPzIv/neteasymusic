import { createStore } from 'redux'
import reducer from './index_reducer'
let store = createStore(reducer)
export default store