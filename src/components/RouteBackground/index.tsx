import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import Background from '../Background';

export type RouteBackgroundProps = {
  component: any;
  path: string;
  exact?: boolean;
};

const RouteBackground: FC<RouteBackgroundProps> = ({
  path,
  component,
  exact = false,
}) => {
  const Component = component;
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        <Background>
          <Component />
        </Background>
      )}
    />
  );
};

export default RouteBackground;
