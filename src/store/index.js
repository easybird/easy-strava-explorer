import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['authentication']
};

const persistedReducer = persistReducer (persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

function openReduxDevToolsExtension() {
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__.open();
}

// openReduxDevToolsExtension();

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let store = createStore (persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
  let persistor = persistStore (store);
  sagaMiddleware.run(rootSaga)
  return {store, persistor};
};
