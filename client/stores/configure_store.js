import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import * as reducers from '../reducers'
import { createLogger } from 'redux-logger';
import { database } from './firebase';

const logger = createLogger();

const browserHistory = createHistory({
  basename: '',             // The base URL of the app (see below)
  forceRefresh: false,      // Set true to force full page refreshes
  keyLength: 6             // The length of location.key
  // A function to use to confirm navigation with the user (see below)
})

browserHistory.listen((location, action) => {})

const reducer = combineReducers({ ...reducers, routing: routerReducer })
const middlewares = [routerMiddleware(browserHistory), thunk];
if(process.env.NODE_ENV == 'DEVELOPMENT') middlewares.push(logger);
const stores = [ reducer, applyMiddleware( ...middlewares ) ];


export default function configureStore(initialState={}) {
	let store = createStore(...stores)
	let history = syncHistoryWithStore(browserHistory, store)
  return [store,history]
}
