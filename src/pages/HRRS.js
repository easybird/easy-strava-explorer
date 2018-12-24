import React from 'react';
import {Redirect} from 'react-router-dom';
import { Row } from 'antd';
import BasicStats from '../components/BasicStats';
import useHRRS from '../hooks/useHRRS';
import useUserData from '../hooks/useUserData';

const Stats = ({location}) => {
  const {authenticated, error} = useUserData();
  const {hrrs, hrRsTimeSeriesData} = useHRRS();

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

  if (error) {
    return (
      <div>
        <p>There is a problem loading your data...</p>
        <p>
          Please come back later or log
          <a href="https://github.com/easybird/easy-strava-explorer"> an issue here.</a>
        </p>
      </div>
    );
  }

  return (
    <div className="Home-header">
      <Row className="Home-paragraph">
      <h2>HR-RS Index</h2>
      <p>
        Running Index is based on the linear relationship between heart rate and
        oxygen uptake – when you run faster, your muscles need more oxygen to
        produce energy, so your heart needs to pump blood faster and your
        heart rate goes up.
      </p>
      </Row>
      <Row className="Home-paragraph">
      <h2>How running index works</h2>
      <p>
        We use your heart rate and pace during your run and your resting heart
        rate and maximal heart rate values to estimate your maximal aerobic
        running speed on a level ground. This speed estimate is then converted
        to an estimate of running VO2max, in other words your Running Index
        score.
      </p>
      </Row>
      <BasicStats hrrs={hrrs} hrRsTimeSeriesData={hrRsTimeSeriesData} />
    </div>
  );
};

export default Stats;
