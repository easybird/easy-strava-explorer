import React from 'react';
import strava from '../strava.svg';
import {STRAVA_REDIRECT_URL} from '../services/strava';
import {useMappedState } from 'redux-react-hook';

const mapState = ({authentication}) => ({
    authenticated: authentication.authenticated,
    athlete: authentication.athlete
})

const Home = () => {
    const {authenticated, athlete } = useMappedState(mapState)

    if (authenticated) {
      return <div>Hallo atleetje: {JSON.stringify(athlete)}</div>
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