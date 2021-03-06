import React from 'react';
import {metresPerSecondToKmPerHour} from '../utils/conversions';
import ChartsContainer from './ChartsContainer';

const Run = ({run}) => (
    <div>
      <h1>Run</h1>
      <p> startDate: {run.start_date} </p>

      <p>average_heartrate: {run.average_heartrate} </p>
      <p> average_speed: {run.average_speed} m/s</p>
      <p>
        {' '}
        average_speed:
        {' '}
        {metresPerSecondToKmPerHour (run.average_speed)}
        {' '}
        km/u
      </p>
      <p>
        HR/RS:
        {' '}
        {Math.round (
          run.average_heartrate /
            metresPerSecondToKmPerHour (run.average_speed) *
            1000
        ) / 1000}
        {' '}
      </p>
    </div>
  );
const BasicStats = ({hrrs, hrRsTimeSeriesData}) => {
  const { hrRsTimeSeries, min, max} = hrRsTimeSeriesData;

  if (!hrrs) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{alignItems: 'left', width: '80vh'}}>
      <ChartsContainer hrrs={hrrs} hrTimeSeries={hrRsTimeSeries} min={min} max={max} />
    </div>
  );
};
export default BasicStats;
