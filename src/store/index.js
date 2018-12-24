import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui']
};

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    return {};
  }
  return reducers(state, action);
}

const persistedReducer = persistReducer (persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// function openReduxDevToolsExtension() {
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__.open();
// }

// openReduxDevToolsExtension();

export default () => {
  // eslint-disable-next-line no-underscore-dangle, no-undef
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore (persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware, logger)));
  const persistor = persistStore (store);
  sagaMiddleware.run(rootSaga)
  return {store, persistor};
};
