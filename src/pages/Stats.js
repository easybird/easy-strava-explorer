import React from 'react';
import {Redirect} from 'react-router-dom';
import BasicStats from '../components/BasicStats';
import { useMappedState } from 'redux-react-hook';
import useStats from '../hooks/useStats';

const mapState = ({authentication}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
  accessToken: authentication.accessToken
})

const Stats = ({location}) => {
    const {authenticated, athlete, accessToken } = useMappedState(mapState);
    const {stats, hrRsTimeSeriesData} = useStats (accessToken);

    if (!authenticated) {
      return <Redirect
      to={{
        pathname: '/',
        state: {from: location},
      }}
    />;
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>
          <span role="img" aria-label="Hello">👋</span>
          {' '}
          {athlete.firstname}
          {' '}
          {athlete.lastname}
        </h1>
        <img src={athlete.profile} alt={athlete.username} />
        <h2>HR-RS Index</h2>
        <h4>
          The index reflexes the pace independent running performance, where a decrease means a performance increase.
        </h4>
        <BasicStats stats={stats} hrRsTimeSeriesData={hrRsTimeSeriesData} />
      </div>
    );
  };

  export default Stats