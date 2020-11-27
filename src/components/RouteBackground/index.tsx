import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import { isAuthenticated } from '../../services/alth';
import Background from '../Background';

export type RouteBackgroundProps = {
  component: any;
  path: string;
  exact?: boolean;
  /* redirect?: string;
  isRedirect?: boolean; */
};

const RouteBackground: FC<RouteBackgroundProps> = ({
  path,
  component,
  exact = false,
  /* redirect = '/',
  isRedirect =  */
}) => {
  const Component = component;
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        <Background redirect="/login" isRedirect={!isAuthenticated()}>
          <Component />
        </Background>
      )}
    />
  );
};

export default RouteBackground;
