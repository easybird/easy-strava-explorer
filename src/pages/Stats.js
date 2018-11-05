import React from 'react';
import {Redirect} from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import BasicStats from '../components/BasicStats';

const Stats = ({location}) => {
    const {isLoggedIn, athlete, accessToken} = useLogin ();

    if (typeof isLoggedIn === 'undefined') {
      return <div>Fetching from localStorage...</div>;
    }

    if (!isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: {from: location},
          }}
        />
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <p>{JSON.stringify (athlete)}</p> */}
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
        <BasicStats accessToken={accessToken} />
      </div>
    );
  };

  export default Stats