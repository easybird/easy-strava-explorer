import {useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {GET_RUNS_WITH_PHOTO, SPECIAL_REQUEST_BUSY} from '../store/reducers/stats';

const TOTAL_RUNS = 10;

const GET_RUNS_WITH_PHOTO_SPECIAL_REQUEST_KEY = `${GET_RUNS_WITH_PHOTO}-${TOTAL_RUNS}`


const mapState = ({stats, ui}) => ({
  runsWithPhotos: stats && stats.specialRequests[GET_RUNS_WITH_PHOTO_SPECIAL_REQUEST_KEY],
    runs: stats && stats.runs,
    error: ui && ui.error
  });

export default function useLastStats () {
    const {runs, runsWithPhotos} = useMappedState (mapState);

    const dispatch = useDispatch ();
    const getRunsWithPhoto = () => dispatch ({type: GET_RUNS_WITH_PHOTO, payload: { totalRuns: TOTAL_RUNS, specialRequestKey: GET_RUNS_WITH_PHOTO_SPECIAL_REQUEST_KEY}});

    useEffect (() => {

      if (!runsWithPhotos || runsWithPhotos === SPECIAL_REQUEST_BUSY) {
        console.log('---getRunsWithPhoto' , runsWithPhotos, '\n');
        getRunsWithPhoto ();
      }
    }, [runsWithPhotos]);

    return {runs, isFetching: runsWithPhotos === SPECIAL_REQUEST_BUSY, runsWithPhotos};
  }
