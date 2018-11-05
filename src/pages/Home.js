import React from 'react';
import strava from '../strava.svg';
import {STRAVA_REDIRECT_URL} from '../services/strava';
import {Redirect} from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Home = ({location}) => {
    const {isLoggedIn} = useLogin ();

    if (isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/stats',
            state: {from: location},
          }}
        />
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={strava} className="App-logo" alt="logo" />
          <a className="App-link" href={STRAVA_REDIRECT_URL}>
            Login to Strava
          </a>
        </header>
      </div>
    );
  };

  export default Home;