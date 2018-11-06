import React, {useState, useEffect} from 'react';
import {Layout, Menu, Button} from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {STRAVA_REDIRECT_URL} from '../services/strava';
import {LOGOUT_SUCCESS} from '../store/reducers/authentication';

const KEYS = {
  HOME: '1',
  STATS: '2',
  LOGIN: '3',
  INFO: '4',
};
const {Header} = Layout;

function getSelectedItemKey (pathname) {
  switch (pathname) {
    case '/stats':
      return KEYS.STATS;
    case '/tokenresponse':
      return KEYS.LOGIN;
    case '/info':
      return KEYS.INFO;
    case '/':
    default:
      return KEYS.HOME;
  }
}

const mapState = ({authentication}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
});

const HeaderComponent = ({pathname}) => {
  const {authenticated, athlete} = useMappedState (mapState);
  const dispatch = useDispatch ();

  const logout = () => dispatch ({type: LOGOUT_SUCCESS});

  const [selectedItemKey, setSelectedItemKey] = useState (
    getSelectedItemKey ()
  );

  useEffect (
    () => {
      setSelectedItemKey (getSelectedItemKey (pathname));
    },
    [pathname]
  );

  return (
    <Header style={{background: 'white'}}>
      <Menu
        // theme="dark"
        mode="horizontal"
        selectedKeys={[selectedItemKey]}
        style={{lineHeight: '64px', float: 'left'}}
      >
        <Menu.Item key={KEYS.HOME}><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key={KEYS.STATS}><Link to="/stats">Stats</Link></Menu.Item>
        <Menu.Item key={KEYS.INFO}><Link to="/info">Info</Link></Menu.Item>
      </Menu>
      <div style={{float: 'right'}}>
        {authenticated
          ? <Button onClick={logout}>
              Logout
            </Button>
          : <Button onClick={() => (window.location = STRAVA_REDIRECT_URL)}>
              Login
            </Button>}
      </div>
    </Header>
  );
};

export default HeaderComponent;
