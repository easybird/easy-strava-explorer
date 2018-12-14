import React from 'react';
import womanRunning from '../../assets/woman-run.jpg';
import {Row, List, Col} from 'antd';
import {Link} from 'react-router-dom';
import AthleteWelcome from '../../components/AthleteWelcome';

export const Welcome = ({athlete, userStats}) => [
  <Row key="athleteWelcome" className="Home-paragraph" justify="center">
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <AthleteWelcome athlete={athlete} userStats={userStats} />
    </div>
  </Row>,
  <Row key="investigation" className="Home-paragraph">
    <h2>What will we investigate?</h2>
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
          Heart Rate Running Speed Index: The lower your heart rate is at a
          certain speed, the better your stamina is.
        </blockquote>
      </div>
    </div>
  </Row>,
  <Row key="explanation">
    <h4>Heart Rate Running Speed Index</h4>
    <p>
      We will combine your heart rate and your average speed. We bundle the data
      of your runs, mix your stats and do some useful calculations with it. We
      present you with some smart charts to give you a good idea of how well you
      are doing.
    </p>
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
