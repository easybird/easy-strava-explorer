import {useEffect, useState} from 'react';
import {TimeSeries} from 'pondjs';
import {metresPerSecondToKmPerHour} from '../utils/conversions';
import useLastStats from './useLastStats';


function useHrRsTimeSeries (stats = []) {
  const hrRsTimeSeriesData = {
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
    points: [],
  };

  const [hrRsData, setHrRsData] = useState ({
    hrRsTimeSeries: null,
    min: null,
    max: null,
  }); // the calculated HR RS over time..

  //   const data = {
  //     name: "traffic",
  //     columns: ["time", "in", "out"],
  //     points: [
  //         [1400425947000, 52, 41],
  //         [1400425948000, 18, 45],
  //         [1400425949000, 26, 49],
  //         [1400425950000, 93, 81],
  //         ...
  //     ]
  // };

  useEffect (
    () => {
      let maxHrRs; let minHrRs;

      const timeSeries = new TimeSeries ({
        ...hrRsTimeSeriesData,
        points: stats
          .map (run => {
            const speed = metresPerSecondToKmPerHour (run.average_speed);
            const hrRs = run.average_heartrate / speed;
            if (typeof maxHrRs === 'undefined' || maxHrRs < hrRs) {
              maxHrRs = hrRs;
            }
            if (typeof minHrRs === 'undefined' || minHrRs > hrRs) {
              minHrRs = hrRs;
            }
            return {
              time: Math.round (new Date (run.start_date).getTime ()),
              hrRs,
              heartRate: run.average_heartrate,
              speed,
              totalElevationGain: run.total_elevation_gain,
              distance: run.distance,
              movingTime: run.moving_time,
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

      setHrRsData ({hrRsTimeSeries: timeSeries, min: minHrRs, max: maxHrRs});
    },
    [stats]
  );

  //   console.log ('---hrRsTimeSeries', hrRsData, '\n');
  return hrRsData;
}

export default function useHRRS () {
  const {stats, isFetching} = useLastStats();

  const [hrrs, setHrrs] = useState ();
  const hrRsTimeSeriesData = useHrRsTimeSeries (hrrs);

  // const [allPlots, setAllPlots] = useState (); // the plotted data: heart rate (Y) / speed (X)
  // const [lastMonthPlots, setLastMonthPlots] = useState (); // the plotted data: heart rate (Y) / speed (X)

  useEffect (
    () => {
      if (!isFetching && stats.length) {
        setHrrs (
          stats.filter (
            ({visibility, type, has_heartrate}) =>
              visibility === 'everyone' && type === 'Run' && has_heartrate
          )
        );
      }
    },
    [stats]
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
