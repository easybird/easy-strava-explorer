import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Layout, Row, Col} from 'antd';
import {StoreProvider} from 'redux-react-hook';
import {PersistGate} from 'redux-persist/integration/react';
import Header from './components/Header';
import configureStore from './store';
import {Home, HRRS, Info, AuthenticationCallback} from './pages';
import powerdByStravaHorizontal from './assets/api_logo_pwrdBy_strava_horiz_light.svg';
import hero from './assets/hero-run.jpg';

const {Content, Footer} = Layout;

const {store, persistor} = configureStore();

export default () => (
  <StoreProvider value={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <img
            style={{
              position: 'absolute',
              width: '100vw',
              height: '50vh',
              objectFit: 'cover',
              objectPosition: '50% 70%',
            }}
            src={hero}
            alt="powered by strava"
          />
          <div style={{height: '50vh'}}>
            <Route
              render={props => <Header pathname={props.location.pathname} />}
            />
          </div>

          <Content>
            <Row type="flex" justify="start" className="Home">
              <Col span={16} offset={4}>
                <Row className="Home-paragraph">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                      path="/tokenresponse"
                      component={AuthenticationCallback}
                    />
                    <Route path="/hrrs" component={HRRS} />
                    <Route path="/info" component={Info} />
                    <Route component={Home} />
                  </Switch>
                </Row>
              </Col>
            </Row>
          </Content>
          <Footer>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{width: '200px'}}>
                <img src={powerdByStravaHorizontal} alt="powered by strava" />
              </div>
              <div>
                Please note that we are not related to Strava, we are just using
                their{' '}
                <a
                  href="http://developers.strava.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  open API
                </a>
              </div>
            </div>
          </Footer>
        </div>
      </Router>
    </PersistGate>
  </StoreProvider>
);
