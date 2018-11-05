import React, {useState, useEffect} from 'react';
import {Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {STRAVA_REDIRECT_URL} from '../services/strava';
import useLogin from '../hooks/useLogin';
const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';

const KEYS = {
  HOME: '1',
  STATS: '2',
  LOGIN: '3',
  INFO: '4',
};
const {Header} = Layout;

const HeaderComponent = ({pathname}) => {
  const {isLoggedIn} = useLogin ();
  const [selectedItemKey, setSelectedItemKey] = useState (
    getSelectedItemKey ()
  );

  useEffect (
    () => {
      setSelectedItemKey (getSelectedItemKey ());
    },
    [pathname]
  );

  console.log('---isLoggedIn', isLoggedIn, '\n');

  function getSelectedItemKey () {
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

  return (
    <Header style={{background: 'white'}}>
      <Menu
        // theme="dark"
        mode="horizontal"
        selectedKeys={[selectedItemKey]}
        style={{lineHeight: '64px'}}
      >
        <Menu.Item key={KEYS.HOME}><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key={KEYS.STATS}><Link to="/stats">Stats</Link></Menu.Item>
        <Menu.Item key={KEYS.INFO}><Link to="/info">Info</Link></Menu.Item>

        {isLoggedIn
          ? <Menu.Item key={KEYS.LOGIN}>
              <button
                onClick={() =>
                  localStorage.setItem (LOCAL_STORAGE_ACCESS_TOKEN, null)}
              >
                Logout
              </button>
            </Menu.Item>
          : <Menu.Item key={KEYS.LOGIN}>
              <a href={STRAVA_REDIRECT_URL}>Login</a>
            </Menu.Item>}
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
