import React from 'react';
import connectWithStrava from '../assets/btn_strava_connectwith_light.svg';

import {STRAVA_REDIRECT_URL} from '../services/strava';
import {useMappedState} from 'redux-react-hook';
import {Row, Col, Divider, List, Card} from 'antd';
import {Link} from 'react-router-dom';
import AthleteWelcome from '../components/AthleteWelcome';

const mapState = ({authentication, stats}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
  userStats: stats.userStats
});

const WelcomeText = () => <Row key="stamina" className="Home-paragraph">
<h2>Run with your stamina in mind</h2>
<h4>
  Do you like to run on a low heart rate? You don't care about speed for most of your runs? Then Strava also lacks some info for you.
  This app solves this lack of knowledge. It visualises how your stamina is evolving, and in which direction.
</h4>
</Row>



const Intro = ({authenticated, athlete, userStats}) => [
  <Row key="tryout" className="Home-paragraph">
    <h2>Want to give it a try?</h2>

    {authenticated
  ? <AthleteWelcome athlete={athlete} userStats={userStats}/>
  : <a href={STRAVA_REDIRECT_URL}>
      <Card
        hoverable
        cover={
          <img
            src={connectWithStrava}
            className="Home-logo"
            alt="connect with strava"
          />
        }
      >
        <Card.Meta
          title="First things first"
          description="To make this app useful for you, please log in to strava"
        />

      </Card>
    </a>}
  </Row>,
  <Row key="investigation" className="Home-paragraph">
    <h2>What will we investigate?</h2>
    <p>
      There are numerous ways and theories of how to do this
    </p><p>
      And therefore, we need the data of your runs, like:
    </p>
    <List
      style={{width: '20em', justifyContent: 'center', margin: '0 auto'}}
      size="small"
      dataSource={[
        'heart rate',
        'speed',
        'distance',
        'altitude gained during a race',
        '...',
      ]}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    <p>
      This app is trying to bundle your runs, mix those stats and do some calculations with it.
    </p><p>
      In this way, it will try to give you a good idea of how well you are doing.
    </p>
  </Row>,
  <Row key="stats" className="Home-paragraph">
    <h2>Check out your stats</h2>
    <List
      style={{width: '20em', justifyContent: 'center', margin: '0 auto'}}
      size="small"
      dataSource={[{name: 'Heart Rate / Running Speed Index', link: '/hrrs'}]}
      renderItem={item => (
        <List.Item><Link to={item.link}>{item.name}</Link></List.Item>
      )}
    />
  </Row>,
];

const Home = () => {
  const {authenticated, athlete, userStats} = useMappedState (mapState);

  return (
    <Row type="flex" justify="start" className="Home">
      <Col span={16} offset={4}>
        <Row className="Home-paragraph">
          <header className="Home-header">
                <WelcomeText />
          <Divider />
          </header>
          <Intro authenticated={authenticated} athlete={athlete} userStats={userStats}/>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
