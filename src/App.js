import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import {Layout} from 'antd';
import {StoreProvider} from 'redux-react-hook';
import configureStore from './store';
import { Home, HRRS, Info, AuthenticationCallback } from './pages';
import { PersistGate } from 'redux-persist/integration/react'

const {Content} = Layout;

const {store, persistor} = configureStore();

export default () =>(
  <StoreProvider value={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <div>
        <Route
          render={props => {
            return <Header pathname={props.location.pathname} />;
          }}
        />

        <Content style={{padding: '50px'}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tokenresponse" component={AuthenticationCallback} />
          <Route path="/hrrs" component={HRRS} />
          <Route path="/info" component={Info} />
          <Route component={Home} />
          </Switch>
        </Content>
      </div>
    </Router>
    </PersistGate>
  </StoreProvider>
);
