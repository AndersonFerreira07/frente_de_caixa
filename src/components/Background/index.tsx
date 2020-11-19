import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { Box } from '@material-ui/core';

import { isAuthenticated } from '../../services/alth';

export type BackgroundProps = {};

const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <Box
      bgcolor="#FFCFF9"
      padding="10px"
      height="100%"
      display="grid"
      gridTemplateColumns="1fr"
      gridTemplateRows="1fr 10fr"
      css={{
        background:
          'url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg)',
        backgroundSize: 'cover',
      }}
    >
      {!isAuthenticated() ? <Redirect to="/login" /> : children}
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />

      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
      <div className="firefly" />
    </Box>
  );
};

export default Background;
