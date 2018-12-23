import React from 'react';
import {Row} from 'antd';
import Intro from './Intro';
import useUserData from '../hooks/useUserData';

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
  const {authenticated, athlete, userStats} = useUserData()

  return (
          <header className="Home-header">
            <WelcomeText firstName={athlete && athlete.firstname}/>
            <Intro
              authenticated={authenticated}
              athlete={athlete}
              userStats={userStats}
            />
          </header>

  );
};

export default Home;
