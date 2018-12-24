import { useEffect } from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import { GET_DETAIL } from '../store/reducers/run';

const mapState = ({stats}) => ({
      runs: stats && stats.runs,
    })

export default function useRun(id) {
    const {runs} = useMappedState (mapState);
    const dispatch = useDispatch ();
    useEffect(() => {
        if (!runs[id] || (!runs[id].hasPhoto && !runs[id].hasDetail)) {
            dispatch ({type: GET_DETAIL, payload: { runId: id}});
        }
    }, [id, runs[id]])

    return runs ? runs[id] : {};
}