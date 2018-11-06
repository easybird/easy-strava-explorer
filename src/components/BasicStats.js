import React from 'react';
import {metresPerSecondToKmPerHour} from '../utils/conversions';
import ChartsContainer from './ChartsContainer';

const Run = ({run}) => {
  return (
    <div>
      <h1>Run</h1>
      <p> startDate: {run['start_date']} </p>

      <p>average_heartrate: {run['average_heartrate']} </p>
      <p> average_speed: {run['average_speed']} m/s</p>
      <p>
        {' '}
        average_speed:
        {' '}
        {metresPerSecondToKmPerHour (run['average_speed'])}
        {' '}
        km/u
      </p>
      <p>
        HR/RS:
        {' '}
        {Math.round (
          run['average_heartrate'] /
            metresPerSecondToKmPerHour (run['average_speed']) *
            1000
        ) / 1000}
        {' '}
      </p>
    </div>
  );
};
const BasicStats = ({stats, hrRsTimeSeriesData}) => {
  const { hrRsTimeSeries, min, max} = hrRsTimeSeriesData;

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{alignItems: 'left', width: '80vh'}}>
      <ChartsContainer stats={stats} hrTimeSeries={hrRsTimeSeries} min={min} max={max} />
      {stats.map (run => <Run key={run.id} run={run} />)}
    </div>
  );
};
export default BasicStats;
