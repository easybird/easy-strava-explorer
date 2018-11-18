import React, { useEffect } from 'react';
import {auth} from '../services/strava';
import { Redirect} from 'react-router-dom';
import {useDispatch, useMappedState } from 'redux-react-hook';
import { LOGIN_SUCCESS } from '../store/reducers/authentication';

const mapState = ({authentication}) => ({
    authenticated: authentication.authenticated
})

const AuthenticationCallback = ({location}) => {
    const {authenticated } = useMappedState(mapState);
    const dispatch = useDispatch();

    const loginSuccess = ({ accessToken, athlete }) => dispatch({ type: LOGIN_SUCCESS, payload: { accessToken, athlete }});

    useEffect(async () => {
        if (!authenticated) {
            const code = new URLSearchParams (location.search).get ('code');

            const result = await auth (code);

            if (result['access_token'] && result.athlete) {
              loginSuccess({ accessToken: result['access_token'] , athlete: result.athlete});
            }
        }
    }, [ authenticated ])

      return authenticated
        ? <Redirect
            to={{
              pathname: '/',
              state: {from: location},
            }}
          />
        : <div><p>Authentication busy...</p></div>;
  }

  export default AuthenticationCallback;
