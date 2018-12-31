import {useEffect, useState} from 'react';
import { useMappedState} from 'redux-react-hook';
import {TimeSeries} from 'pondjs';
import {metresPerSecondToKmPerHour} from '../utils/conversions';
import useLastStats from './useLastStats';

function mapToHrRsTimeSeries(runs = []) {
  let maxHrRs; let minHrRs;

  const hrRsTimeSeries = new TimeSeries ({
    name: 'HR-RS',
    columns: [
    'time',
    'hrrs',
    'heartRate',
    'speed',
    'totalElevationGain',
    'distance',
    'movingTime',
    ],
    points: runs
      .map (run => {
        const { runStats: { speed, hrRs, time, heartRate, elevationGain, distance } } = run;

        if (typeof hrRs === 'number') {
          if (typeof maxHrRs === 'undefined' || maxHrRs < hrRs) {
            maxHrRs = hrRs;
          }
          if (typeof minHrRs === 'undefined' || minHrRs > hrRs) {
            minHrRs = hrRs;
          }
        }
        return {
          time: new Date (run.date).getTime (),
          hrRs,
          heartRate: heartRate.average,
          speed: metresPerSecondToKmPerHour (speed.average),
          totalElevationGain: elevationGain,
          distance,
          movingTime: time,
        };
      })
      .sort ((a, b) => a.time - b.time)
      .map (
        ({
          time,
          hrRs,
          heartRate,
          speed,
          totalElevationGain,
          distance,
          movingTime,
        }) => [
          time,
          hrRs,
          heartRate,
          speed,
          totalElevationGain,
          distance,
          movingTime,
        ]
      )
      .map (event =>
        //   console.log(event);
         event
      ),
  });

  return {
    hrRsTimeSeries,
    min: minHrRs,
    max: maxHrRs,
  }
}

export function useHrRsTimeSeries (runs = []) {
  const [hrRsData, setHrRsData] = useState (); // the calculated HR RS over time..

  useEffect (
    () => {
      setHrRsData (mapToHrRsTimeSeries(runs));
    },
    [runs]
  );

  return hrRsData;
}

const mapState = ({stats}) => ({
  runs: stats && stats.runs,
})

export function useHrRsTimeSeriesById(runIds = []) {
  const {runs} = useMappedState (mapState);
  const [hrRsData, setHrRsData] = useState ([]); // the calculated HR RS over time..

  useEffect (
    () => {
      setHrRsData (mapToHrRsTimeSeries(runIds.map(id => runs[id])));
    },
    [runs, runIds]
  );

  return hrRsData;
}

export default function useHRRS () {
  const {runs, isFetching} = useLastStats();

  const [hrrs, setHrrs] = useState ();

  const hrRsTimeSeriesData = useHrRsTimeSeries (hrrs);

  // const [allPlots, setAllPlots] = useState (); // the plotted data: heart rate (Y) / speed (X)
  // const [lastMonthPlots, setLastMonthPlots] = useState (); // the plotted data: heart rate (Y) / speed (X)

  useEffect (
    () => {
      if (!isFetching && runs) {
        setHrrs (
          Object.entries(runs).filter (
            ([, {runStats}]) =>
              runStats.hrRs
          ).map(([key, value]) => ({
            key,
            ...value
          }))
        );
      }
    },
    [runs]
  );

  //  The prerequisites for calculation are that your speed remains above 6 km/h and that the run lasts for at least 12 minutes.
  // set maximal and resting heart rate
  // const logStats = () =>
  //   hrrs &&
  //   hrrs.forEach (stat =>
  //     console.log (
  //       '---stat',
  //       stat,
  //       {
  //         average_heartrate: stat.average_heartrate,
  //         average_speed: metresPerSecondToKmPerHour (stat.average_speed),
  //       },
  //       '\n'
  //     )
  //   );

  // logStats ();s

  return {hrrs, hrRsTimeSeriesData};
}
