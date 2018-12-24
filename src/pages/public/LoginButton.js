import React from 'react';
import { Card} from 'antd';
import connectWithStrava from '../../assets/btn_strava_connectwith_orange.svg';

import {STRAVA_REDIRECT_URL} from '../../services/strava';

export const LoginButton = () => (
    <a href={STRAVA_REDIRECT_URL}>
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
    </a>
  );

  export const LoginView = () => (
    <div style={{width: '50%', minWidth: '250px', margin: '0 auto'}}>
      <LoginButton />
    </div>
  );