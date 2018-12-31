import {useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {GET_RUNS_WITH_PHOTO, SPECIAL_REQUEST_BUSY} from '../store/reducers/stats';

export const DEFAULT_TOTAL_RUNS = 10;

export const TOTAL_RUN_OPTIONS = [DEFAULT_TOTAL_RUNS, 20, 30];

const GET_RUNS_WITH_PHOTO_SPECIAL_REQUEST_KEY = (totalRuns) => `${GET_RUNS_WITH_PHOTO}-${totalRuns}`

const selectLastRuns = (runs, totalRuns) => runs && Object.keys(runs).sort((firstKey, secondKey) => secondKey - firstKey).slice(0, totalRuns)

const mapState = ({stats, ui}) => ({
  specialRequests: stats && stats.specialRequests,
    runs: stats && stats.runs,
    error: ui && ui.error
  });

export default function useLastStats (totalRuns = DEFAULT_TOTAL_RUNS) {
    const {runs, specialRequests} = useMappedState (mapState);

    const runsWithPhotos = specialRequests && specialRequests[GET_RUNS_WITH_PHOTO_SPECIAL_REQUEST_KEY(totalRuns)]

    const dispatch = useDispatch ();
    const getRunsWithPhoto = () => dispatch ({type: GET_RUNS_WITH_PHOTO, payload: { totalRuns, specialRequestKey: GET_RUNS_WITH_PHOTO_SPECIAL_REQUEST_KEY(totalRuns)}});

    useEffect (() => {
      if (!runsWithPhotos || runsWithPhotos === SPECIAL_REQUEST_BUSY) {
        getRunsWithPhoto ();
      }
    }, [runsWithPhotos, totalRuns]);

    return {
      runs,
      isFetching: runsWithPhotos === SPECIAL_REQUEST_BUSY,
      lastRuns: {
        normal: selectLastRuns(runs, totalRuns),
        withPhotos: runsWithPhotos && runsWithPhotos !== SPECIAL_REQUEST_BUSY && runsWithPhotos
      }
    }
  }
