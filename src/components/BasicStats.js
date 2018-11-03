import React from 'react';
import useStats from '../hooks/useStats';

const BasicStats = ({accessToken}) => {
    const basicStats = useStats(accessToken);

      if (!basicStats) {
        return <div>Loading...</div>;
      }

      return <div><p>{JSON.stringify (basicStats)}</p></div>;
    }
    export default BasicStats;