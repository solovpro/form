import formReducers from './form-reducers'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    form: formReducers,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
