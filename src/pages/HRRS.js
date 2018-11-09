import React from 'react';
import {Redirect} from 'react-router-dom';
import BasicStats from '../components/BasicStats';
import {useMappedState} from 'redux-react-hook';
import useHRRS from '../hooks/useHRRS';

const mapState = ({authentication}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
  accessToken: authentication.accessToken,
});

const Stats = ({location}) => {
  const {authenticated, accessToken} = useMappedState (mapState);
  const {hrrs, hrRsTimeSeriesData} = useHRRS (accessToken);

  if (!authenticated) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {from: location},
        }}
      />
    );
  }

  return (
    <div>
      <h2>HR-RS Index</h2>
      <h4>
        The index reflexes the pace independent running performance, where a decrease means a performance increase.
      </h4>
      <h2>The science (from polar website)</h2>
      <p>
        Running Index is based on the linear relationship between heart rate and oxygen uptake – when you run faster, your muscles need more oxygen to produce energy, so your your heart needs to pump blood faster and your heart rate goes up.
      </p>
      <h2>How running index works</h2>
      <p>
        Your Running Index score is calculated automatically after every run. We use your heart rate and pace during your run and your resting heart rate and maximal heart rate values to estimate your maximal aerobic running speed on a level ground. This speed estimate is then converted to an estimate of running VO2max, in other words your Running Index score.
      </p><p>
        <a href="https://support.polar.com/en/support/tips/Running_Index_feature">
          More info on Polar website
        </a>
      </p>
      <p>
        Links: <ul>
          <li>
            <a href="https://www.runnersworld.com/training/a20829802/tracking-fitness-with-the-heart-rate-running-speed-index/">
              tracking-fitness-with-the-heart-rate-running-speed-index
            </a>
          </li>
          <li>
            <a href="https://apps.garmin.com/nl-BE/apps/bc41945e-e85e-4a17-85d3-c63b36f4c6ed;jsessionid=4E2F9FC158DD73F7E8496BA16D77BED6?tab=reviews&criteria=rating&ascending=false&displayCurrentVersion=false">
              garmin app
            </a>
          </li>
          <li>
            <a href="https://www.runnersworld.com/beginner/a20812270/should-i-do-heart-rate-training">
              should i do heart rate training
            </a>
          </li>
          <li>
            <a href="https://www.ncbi.nlm.nih.gov/pubmed/24345970">
              heart rate may be an efficient method
            </a>
          </li>
          <li>
            <a href="https://www.researchgate.net/publication/259351785_Heart_Rate-Running_Speed_Index_May_Be_an_Efficient_Method_of_Monitoring_Endurance_Training_Adaptation">
              Heart_Rate-Running_Speed_Index_May_Be_an_Efficient_Method_of_Monitoring_Endurance_Training_Adaptation
            </a>
          </li>
          <li>
            <a href="https://activesalem.com/gallagher-fitness-training-programs/vo2max-heart-rate-pace-chart/">
              VO2 Max Heart Rate Page Chart
            </a>
          </li>
          <li>
            <a href="https://www.polar.com/en/smart-coaching/running-index">
              Polar running index
            </a>
          </li>
        </ul>
      </p>
      <BasicStats hrrs={hrrs} hrRsTimeSeriesData={hrRsTimeSeriesData} />
    </div>
  );
};

export default Stats;
