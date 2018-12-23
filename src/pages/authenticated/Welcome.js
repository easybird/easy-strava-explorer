import React from 'react';
import {Row} from 'antd';
import {Link} from 'react-router-dom';
import womanRunning from '../../assets/woman-run.jpg';
import AthleteWelcome from '../../components/AthleteWelcome';
import FirstStatsImpression from '../../components/FirstStatsImpression';

const Welcome = ({athlete, userStats}) => [
  <Row key="athleteWelcome" className="Home-paragraph" justify="center">
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <AthleteWelcome athlete={athlete} userStats={userStats} />
    </div>
  </Row>,
  <Row key="investigation" className="Home-paragraph">
    <h2>What are we looking for?</h2>
    <div>
      <img
        style={{
          width: '100vw',
          height: '50vh',
          objectFit: 'cover',
          objectPosition: '45% 30%',
        }}
        src={womanRunning}
        alt="woman running"
      />
      <div
        className="Home-tryout"
        style={{
          position: 'absolute',
          width: '40%',
          minWidth: '200px',
          left: '10%',
          top: '20%',
        }}
      >
        <blockquote>
          Heart Rate Running Speed Index: The lower your heart rate at a
          certain speed, the better your stamina.
        </blockquote>
      </div>
    </div>
  </Row>,
  <Row key="explanation">
    <h4>Heart Rate Running Speed Index</h4>
    <p>
      We combine your heart rate and your average speed. We bundle the data
      of your runs, mix your stats and do some useful calculations with it. We
      present you with some smart charts to give you a good idea of how well you
      are doing.
    </p>
    <FirstStatsImpression />
    <p>
      <Link to="/hrrs">Have a look at your graphs</Link>
    </p>
  </Row>,
  <Row key="No Holy grail" className="Home-paragraph">
    <h2>Detailed analysis</h2>
    <p>
      This is no holy grail. Your heart rate is also influenced by the
      circumstances of the track you're running. Are you running at high
      altitude? Running through the sand? Running long distances at a fast pace?
    </p>
    <p>
      We will indicate the runs from which we think they should probably be left
      out of the equasion. You will also be able to manually disable runs that
      are maybe messing with your graph.
    </p>
  </Row>,
];

export default Welcome;