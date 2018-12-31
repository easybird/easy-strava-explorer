import React from 'react';
import {Card} from 'antd';
import useRun from '../hooks/useRun';
import {round} from '../utils/conversions';
import RunningLoader from './lottie/RunningLoader';
import {prettifyDate, prettifyMinutes} from '../utils/dates';

const {Meta} = Card;

const RunStatsRow = ({label, value}) => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <div>{label}:</div>
    <div>{value || '-'}</div>
  </div>
);

const RunStats = ({date, runStats}) => (
  <div style={{marginTop: '0.5em'}}>
    <div>{date ? prettifyDate(date) : '-'}</div>
    <div style={{marginTop: '0.5em'}}>
      <RunStatsRow
        label="Time"
        value={runStats && runStats.time && prettifyMinutes(runStats.time)}
      />
      <RunStatsRow
        label="Distance"
        value={
          runStats && runStats.distance && `${round(runStats.distance, 2)} km`
        }
      />
      <RunStatsRow
        label="HR RS"
        value={runStats && runStats.hrRs && `${round(runStats.hrRs, 3)}`}
      />
    </div>
  </div>
);

const Run = ({id, style}) => {
  const {name, photoUrl, date, runStats} = useRun(id);

  return (
    <Card
      style={style}
      cover={
        photoUrl ? (
          <img
            style={{
              width: '100%',
              height: '20em',
              objectFit: 'cover',
              objectPosition: '45% 30%',
            }}
            alt="main"
            src={photoUrl}
          />
        ) : (
          <RunningLoader />
        )
      }
    >
      <Meta title={name || 'Loading...'} />
      {<RunStats date={date} runStats={runStats} />}
    </Card>
  );
};

export default Run;
