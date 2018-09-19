import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const middleWare = [
  thunk, 
  logger
];

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;