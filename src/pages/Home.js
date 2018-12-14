import React from 'react';
import { Intro } from './Intro';
import {useMappedState} from 'redux-react-hook';
import {Row, Col} from 'antd';

const mapState = ({authentication, stats}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
  userStats: stats.userStats,
});

const WelcomeText = ({firstName}) => (
  <Row key="stamina" className="Home-paragraph">
    <h2>{firstName ? `${firstName}, run `: 'Run '} with your stamina in mind</h2>
    <h4>
      Do you like to run at a low heart rate? You don't care about speed for
      most of your runs? Then Strava also lacks some info for you. This app
      solves this lack of knowledge. It visualises how your stamina is evolving,
      and in which direction.
    </h4>
  </Row>
);


const Home = () => {
  const {authenticated, athlete, userStats} = useMappedState(mapState);

  return (
    <Row type="flex" justify="start" className="Home">
      <Col span={16} offset={4}>
        <Row className="Home-paragraph">
          <header className="Home-header">
            <WelcomeText firstName={athlete && athlete.firstname}/>
            <Intro
              authenticated={authenticated}
              athlete={athlete}
              userStats={userStats}
            />
          </header>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
