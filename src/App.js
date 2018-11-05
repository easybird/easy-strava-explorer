import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import {Layout} from 'antd';
import {StoreProvider} from 'redux-react-hook';
import store from './store';
import { Home, Stats, Info, AuthenticationCallback } from './pages';

const {Content} = Layout;

export default () =>(
  <StoreProvider value={store}>
    <Router>
      <div>
        <Route
          render={props => {
            return <Header pathname={props.location.pathname} />;
          }}
        />

        <Content style={{padding: '50px'}}>
          <Route exact path="/" component={Home} />
          <Route path="/tokenresponse" component={AuthenticationCallback} />
          <Route path="/stats" component={Stats} />
          <Route path="/info" component={Info} />
        </Content>
      </div>
    </Router>
  </StoreProvider>
);
