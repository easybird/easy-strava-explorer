import React from 'react';
import useLastStats from "../hooks/useLastStats";
import Run from './Run';

const FirstStatsImpression = () => {
    const { runsWithPhotos, isFetching } = useLastStats();

    if (isFetching) {
        return <p>Busy fetching data...</p>
    }
    if (runsWithPhotos) {
        return runsWithPhotos.map(key => <Run key={key} id={key} />);
    }
    return <p>No runs with photos</p>
}

export default FirstStatsImpression;