import React, {useState} from 'react';
import {Radio, Select} from 'antd';
import useLastStats, {
  TOTAL_RUN_OPTIONS,
  DEFAULT_TOTAL_RUNS,
} from '../hooks/useLastStats';
import Run from './Run';
import { useHrRsTimeSeriesById } from '../hooks/useHRRS';
import BasicStats from './BasicStats';

const STATS_TYPE = {
  LAST_RUNS: 1,
  WITH_PHOTOS: 2,
};

const RadioGroup = Radio.Group;
const {Option} = Select;

const runStyle = {minWidth: '20em', maxWidth: '40em', flex: 1};

const selectRuns = (statsType, lastRuns = {}) => {
  switch (statsType) {
    case STATS_TYPE.LAST_RUNS:
      return lastRuns.normal;
    case STATS_TYPE.WITH_PHOTOS:
      return lastRuns.withPhotos;
    default:
      return null;
  }
};

const FirstStatsImpression = () => {
  const [totalRuns, onChangeTotalRuns] = useState(DEFAULT_TOTAL_RUNS);
  const {lastRuns} = useLastStats(totalRuns);
  const [selectedRadioButton, onChangeRadioButton] = useState(
    STATS_TYPE.WITH_PHOTOS
  );
  const selectedRuns = selectRuns(selectedRadioButton, lastRuns);

  const hrRsTimeSeriesData = useHrRsTimeSeriesById(selectedRuns);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5em',
        }}
      >
        <RadioGroup
          onChange={e => onChangeRadioButton(e.target.value)}
          value={selectedRadioButton}
        >
          <Radio value={STATS_TYPE.LAST_RUNS}>Last Runs</Radio>
          <Radio value={STATS_TYPE.WITH_PHOTOS}>Last Runs with a Photo</Radio>
        </RadioGroup>
        <Select
          defaultValue={DEFAULT_TOTAL_RUNS}
          showSearch
          style={{width: 200}}
          placeholder="Total runs to view"
          optionFilterProp="children"
          onChange={onChangeTotalRuns}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {TOTAL_RUN_OPTIONS.map(value => (
            <Option value={value}>{value}</Option>
          ))}
        </Select>
      </div>
      <div
        style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
      >
        {selectedRuns
          ? selectedRuns.map(key => <Run style={runStyle} key={key} id={key} />)
          : Array.from(Array(totalRuns)).map(key => (
              <Run style={runStyle} key={key} />
            ))}
      </div>
      {selectedRuns && <BasicStats hrrs={selectedRuns} hrRsTimeSeriesData={hrRsTimeSeriesData} />}
    </div>
  );
};

export default FirstStatsImpression;
