import {useEffect, useState} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {metresPerSecondToKmPerHour} from '../utils/conversions';
import {TimeSeries} from 'pondjs';
import {GET_LIST_OF_ACTIVITIES} from '../store/reducers/stats';

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
      'elapsedTime',
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
      let maxHrRs, minHrRs;

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
              elapsedTime: run.elapsed_time,
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
              elapsedTime,
            }) => [
              time,
              hrRs,
              heartRate,
              speed,
              totalElevationGain,
              distance,
              elapsedTime,
            ]
          )
          .map (event => {
            //   console.log(event);
            return event;
          }),
      });

      setHrRsData ({hrRsTimeSeries: timeSeries, min: minHrRs, max: maxHrRs});
    },
    [stats]
  );

  //   console.log ('---hrRsTimeSeries', hrRsData, '\n');
  return hrRsData;
}

const mapState = ({stats}) => ({
  stats: stats.activities,
  isFetching: stats.isFetching,
});

export default function useHRRS () {
  const {stats, isFetching} = useMappedState (mapState);

  const [hrrs, setHrrs] = useState ();
  const hrRsTimeSeriesData = useHrRsTimeSeries (hrrs);

  const dispatch = useDispatch ();
  const getListOfActivities = () => dispatch ({type: GET_LIST_OF_ACTIVITIES});

  // const [allPlots, setAllPlots] = useState (); // the plotted data: heart rate (Y) / speed (X)
  // const [lastMonthPlots, setLastMonthPlots] = useState (); // the plotted data: heart rate (Y) / speed (X)

  useEffect (() => {
    if (!stats.length && !isFetching) {
      getListOfActivities ();
    }
  });

  useEffect (
    () => {
      if (!isFetching && stats.length) {
        console.log('---hupsa set the stats', stats.length, '\n');

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
  const logStats = () =>
    hrrs &&
    hrrs.forEach (stat =>
      console.log (
        '---stat',
        stat,
        {
          average_heartrate: stat['average_heartrate'],
          average_speed: metresPerSecondToKmPerHour (stat['average_speed']),
        },
        '\n'
      )
    );

  // logStats ();s

  return {hrrs, hrRsTimeSeriesData};
}
