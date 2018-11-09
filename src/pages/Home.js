import React from 'react';
import strava from '../strava.svg';
import howYouDoin from '../assets/how-you-doin.gif';
import {STRAVA_REDIRECT_URL} from '../services/strava';
import {useMappedState} from 'redux-react-hook';
import {Row, Col, Avatar, Divider, List} from 'antd';
import {Link} from 'react-router-dom';

const mapState = ({authentication}) => ({
  authenticated: authentication.authenticated,
  athlete: authentication.athlete,
});

const Intro = () => (
  <Row type="flex" justify="start">
    <Col span={16} offset={4}>
      <Row className="Home-paragraph">
        <h2>Check out your stamina</h2>
        <h4>
          Personally I like to run on a low heart rate, and Strava is mainly focussed on "speed records", but I honestly couldn't care less for most of my runs. I just want to know if my stamina is evolving, and if so, in which direction. This app is mainly used to show you some extended data that you won't see on Strava.
        </h4>
      </Row>
      <Row className="Home-paragraph">
        <h2>Want to give it a try?</h2>
        <p>
          Login to Strava, and let us calculate how you doin'.
        </p>
        <img src={howYouDoin} />
      </Row>
      <Row className="Home-paragraph">
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
      </Row>
      <Row className="Home-paragraph">
        <h2>Check out your stats</h2>
        <List
          style={{width: '20em', justifyContent: 'center', margin: '0 auto'}}
          size="small"
          dataSource={[{name: 'Heart Rate / Running Speed Index', link: '/hrrs'}]}
          renderItem={item => (
            <List.Item><Link to={item.link}>{item.name}</Link></List.Item>
          )}
        />
      </Row>
    </Col>
  </Row>
);

const Home = () => {
  const {authenticated, athlete} = useMappedState (mapState);

  return (
    <div className="Home">
      <header className="Home-header">
        {authenticated
          ? [
              <span role="img" aria-label="Hello">
                {`👋 ${athlete.firstname} ${athlete.lastname}`}
              </span>,
              <Avatar
                shape="square"
                size={256}
                icon="user"
                src={athlete.profile}
                alt={athlete.username}
              />,
            ]
          : [
              <img src={strava} className="Home-logo" alt="logo" />,
              <a href={STRAVA_REDIRECT_URL}>
                Login to Strava
              </a>,
            ]}
      </header>
      <Divider />
      <Intro />
    </div>
  );
};

export default Home;
