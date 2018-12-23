import React from 'react';

import {PublicIntro} from './public/PublicIntro';
import Welcome from './authenticated/Welcome';

const Intro = ({authenticated, athlete, userStats}) =>
  authenticated ? (
    <Welcome athlete={athlete} userStats={userStats} />
  ) : (
    <PublicIntro />
  );

  export default Intro;