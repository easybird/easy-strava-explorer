import React from 'react';
import Lottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  // eslint-disable-next-line global-require
  animationData: require('./runningLoader.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const RunningLoader = ({ width, height}) => (
  <Lottie
    options={defaultOptions}
    width={width}
    height={height}
  />
);

export default RunningLoader;
