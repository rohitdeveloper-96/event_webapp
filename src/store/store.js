import { combineReducers, createStore } from 'redux'
import adminReducers from '../store/adminreducer'
import UserList from './userReducers'
const rootreducrs = combineReducers({
    admin: adminReducers,
    users: UserList
})

export const store = createStore(rootreducrs)