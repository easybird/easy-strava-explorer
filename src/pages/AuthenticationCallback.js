import React, { useEffect, useState } from 'react';
import {auth} from '../services/strava';
import { Redirect} from 'react-router-dom';

const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
const LOCAL_STORAGE_ATHLETE = 'athlete';

let code;

const AuthenticationCallback = ({location}) => {
    const [authenticated, setAuthentication] = useState(false);

    useEffect(async () => {
        code = new URLSearchParams (location.search).get ('code');

        const result = await auth (code);

        if (result['access_token'] && result.athlete) {
          localStorage.setItem (LOCAL_STORAGE_ACCESS_TOKEN, result['access_token']);
          localStorage.setItem (
            LOCAL_STORAGE_ATHLETE,
            JSON.stringify (result.athlete)
          );
        }
        setAuthentication(true);
    })


      return authenticated
        ? <Redirect
            to={{
              pathname: '/stats',
              state: {from: location},
            }}
          />
        : <div><p>Authentication busy...</p></div>;
  }

  export default AuthenticationCallback;
