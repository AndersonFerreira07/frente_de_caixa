import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core';

import logo from '../../assets/logo512.png';

const useStyles = makeStyles((theme) => ({
  '@keyframes travel': {
    from: {},
    to: {
      left: '640px',
    },
  },
  '@keyframes bounce': {
    'from, to': {
      botttom: 0,
      animationTimingFunction: 'ease-out',
    },
    '50%': {
      bottom: '220px',
      animationTimingFunction: 'ease-in',
    },
  },
  stage: {
    position: 'relative',
    margin: '1em auto',
    width: '660px',
    height: '240px',
    border: '2px solid #666',
    background: '#cff',
  },
  traveler: {
    position: 'absolute',
    width: '20px',
    height: '240px',
    animationName: '$travel',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationDuration: '4.8s',

    WebkitAnimationName: '$travel',
    WebkitAnimationTimingFunction: 'linear',
    WebkitAnimationIterationCount: 'infinite',
    WebkitAnimationDirection: 'alternate',
    WebkitAnimationDuration: '4.8s',
  },
  bouncer: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'red',
    borderRadius: '10px',
    animationName: '$bounce',
    animationIterationCount: 'infinite',
    animationDuration: '4.2s',

    WebkitAnimationName: '$bounce',
    WebkitAnimationIterationCount: 'infinite',
    WebkitAnimationDuration: '4.2s',
  },
}));

export type EmptyBackgroundProps = {};

const EmptyBackground: FC<EmptyBackgroundProps> = () => {
  const classes = useStyles();
  return (
    <div className="stage">
      <div className="traveler">
        <div className="bouncer">
          <img
            src={logo}
            alt="logo"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyBackground;
