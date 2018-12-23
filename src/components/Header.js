import React, {useState, useEffect} from 'react';
import { Layout, Menu, Button, Avatar, Dropdown  } from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {STRAVA_REDIRECT_URL} from '../services/strava';
import {LOGOUT_SUCCESS} from '../store/reducers/authentication';
import connectWithStrava from '../assets/btn_strava_connectwith_light.svg';

const KEYS = {
  HOME: '1',
  HRRS: '2',
  LOGIN: '3',
  INFO: '4',
};
const {Header} = Layout;

function getSelectedItemKey (pathname) {
  switch (pathname) {
    case '/hrrs':
      return KEYS.HRRS;
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
    getSelectedItemKey (pathname)
  );

  useEffect (
    () => {
      setSelectedItemKey (getSelectedItemKey (pathname));
    },
    [pathname]
  );

  return (
    <Header style={{backgroundColor: 'white'}}>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedItemKey]}
        style={{lineHeight: '64px', float: 'left'}}
      >
        <Menu.Item key={KEYS.HOME}><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key={KEYS.HRRS}><Link to="/hrrs">HR-RS Index</Link></Menu.Item>
        <Menu.Item key={KEYS.INFO}><Link to="/info">Info</Link></Menu.Item>
      </Menu>
      <div style={{float: 'right'}}>
        {authenticated
          ? [<Dropdown overlay={<Menu>
            <Menu.Item><button style={{border: "none", backgroundColor: "inherit"}} type="button" onClick={logout}>
            Logout
          </button></Menu.Item>
          </Menu>}><Avatar size="large" icon="user" style={{marginRight: '1em'}}src={athlete.profile} alt={athlete.username}/></Dropdown>,
          ]
          : [
          <Button size="large" onClick={() => (window.location = STRAVA_REDIRECT_URL)}>
                <img style={{ height: '40px'}} src={connectWithStrava} alt="connect with strava" />
            </Button>]
            }
      </div>
    </Header>
  );
};

export default HeaderComponent;
