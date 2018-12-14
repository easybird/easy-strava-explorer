import React from 'react';
import {Redirect} from 'react-router-dom';
import BasicStats from '../components/BasicStats';
import {useMappedState } from 'redux-react-hook';
import useHRRS from '../hooks/useHRRS';

const mapState = ({authentication}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
});

const Stats = ({location}) => {
  const {authenticated} = useMappedState (mapState);
  const {hrrs, hrRsTimeSeriesData} = useHRRS ();

  if (!authenticated) {
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
    <div>
      <h2>HR-RS Index</h2>
      <p>
        Running Index is based on the linear relationship between heart rate and oxygen uptake – when you run faster, your muscles need more oxygen to produce energy, so your your heart needs to pump blood faster and your heart rate goes up.
      </p>
      <h2>How running index works</h2>
      <p>
        We use your heart rate and pace during your run and your resting heart rate and maximal heart rate values to estimate your maximal aerobic running speed on a level ground. This speed estimate is then converted to an estimate of running VO2max, in other words your Running Index score.
      </p>
      <BasicStats hrrs={hrrs} hrRsTimeSeriesData={hrRsTimeSeriesData} />
    </div>
  );
};

export default Stats;
