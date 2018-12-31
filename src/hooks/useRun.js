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
        if (id) {
            const hasPhotoButNoDetail = runs[id].hasPhoto && !runs[id].hasDetail && !runs[id].isFetching
            if (!runs[id] || hasPhotoButNoDetail) {
                dispatch ({type: GET_DETAIL, payload: { runId: id}});
            }
        }
    }, [id, runs[id]]);

    console.log('---runs[id]', runs[id], '\n');

    if (!id) {
        return {};
    }

    return runs ? runs[id] : {};
}