import React, {useState} from 'react';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  ScatterChart,
  Resizable,
} from 'react-timeseries-charts';

const perEventStyle = (column, event) => {
  const color = 'steelblue'; // heat[Math.floor((1 - event.get("station1") / 40) * 9)];
  return {
    normal: {
      fill: color,
      opacity: 1.0,
    },
    highlighted: {
      fill: color,
      stroke: 'none',
      opacity: 1.0,
    },
    selected: {
      fill: 'none',
      stroke: '#2CB1CF',
      strokeWidth: 3,
      opacity: 1.0,
    },
    muted: {
      stroke: 'none',
      opacity: 0.4,
      fill: color,
    },
  };
};

const infoStyle = {
    fill: 'black',
    color: '#DDD',
    width: '150px',
  }

const timeAxisStyle = {
  values: {valueColor: 'Green', valueWeight: 200, valueSize: 12},
};

const round = (number) => Math.round(number * 100) / 100;

export default function ChartsContainer({hrTimeSeries, min, max}) {
  const [highlightedPoint, setHighlightedPoint] = useState ();
  const [selectedPoint, setSelectedPoint] = useState ();

  let infoValues = [];
  let hrRsIndex = '-';
  let timeStamp = '-';
  let heartRate = '-';
  let speed = '-';
  let totalElevationGain = '-';
  let distance = '-';
  let elapsedTime = '-';

  if (highlightedPoint) {
    hrRsIndex = round(highlightedPoint.event.get (highlightedPoint.column))
    timeStamp = highlightedPoint.event.timestamp ().toLocaleString ();
    heartRate = highlightedPoint.event.get ('heartRate');
    speed = highlightedPoint.event.get ('speed');
    totalElevationGain = highlightedPoint.event.get ('totalElevationGain');
    distance = highlightedPoint.event.get ('distance');
    elapsedTime = highlightedPoint.event.get ('elapsedTime');
    infoValues = [{label: 'HR-RS Index', value: hrRsIndex}];
  }

  return hrTimeSeries && hrTimeSeries.range ()
    ? <div>
        <div className="row">
          <h4>Highlighted run</h4>
          <h5>Date: {timeStamp}</h5>
          <p>HR-RS Index: {hrRsIndex}</p>
          <p>Heart Rate: {heartRate}</p>
          <p>Speed: {speed} km/h</p>
          <p>Total elevation gain: {totalElevationGain} metres</p>
          <p>Average elevation: {round(totalElevationGain/(distance/1000))} metres/km </p>
          <p>Distance: {round(distance/1000)} km</p>
          <p>Elapsed time: {round(elapsedTime/60)} minutes</p>
        </div>

        <hr />

        <Resizable>
          <ChartContainer
            utc
            enablePanZoom
            onBackgroundClick={() => setSelectedPoint (null)}
            timeRange={hrTimeSeries.range ()}
            timeAxisStyle={timeAxisStyle}
          >
            <ChartRow height="500">
              <YAxis
                id="t-axis"
                label="HR / Speed"
                min={min}
                max={max}
                format="d"
                width="70"
                type="linear"
              />
              <Charts>
                {/* <BandChart
              axis="t-axis"
              // style={style}
              spacing={1}
              column="t"
              interpolation="curveBasis"
              series={hrTimeSeries}
            /> */}
                <LineChart
                  axis="t-axis"
                  // style={style}
                  spacing={1}
                  columns={['hrrs']}
                  interpolation="curveBasis"
                  series={hrTimeSeries}
                />
                <ScatterChart
                  axis="t-axis"
                  series={hrTimeSeries}
                  columns={['hrrs']}
                  style={perEventStyle}
                  info={infoValues}
                  infoHeight={28}
                  infoWidth={110}
                  infoStyle={infoStyle}
                  format=".1f"
                  selected={selectedPoint}
                  onSelectionChange={setSelectedPoint}
                  onMouseNear={setHighlightedPoint}
                  highlight={highlightedPoint}
                  radius={(event, column) => 4}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    : null;
}
