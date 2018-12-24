import React from 'react';
import useRun from '../hooks/useRun';

const Run = ({id}) => {
    const {name, photoUrl, date } = useRun(id);

    return <div key={id}>
        <h2>{name}</h2>
        <h3>{photoUrl}</h3>
        <p>{date}</p>
    </div>
}

export default Run;
