import {useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {GET_LIST_OF_ACTIVITIES} from '../store/reducers/stats';

const mapState = ({stats, ui}) => ({
    stats: stats.activities,
    isFetching: ui.isFetching,
    error: ui.error
  });

export default function useLastStats () {
    const {stats, isFetching, error} = useMappedState (mapState);

    const dispatch = useDispatch ();
    const getListOfActivities = () => dispatch ({type: GET_LIST_OF_ACTIVITIES});

    useEffect (() => {
      if (!stats.length && !isFetching && !error) {
        getListOfActivities ();
      }
    }, [stats, error, isFetching]);

    console.log('stats', stats);
    return {stats, isFetching};
  }
