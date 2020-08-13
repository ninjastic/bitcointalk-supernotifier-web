import React from 'react';
import { Route as ReactDOMRoute } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import Maintenance from '../pages/Maintenance';

const Route = ({ path, exact, component: Component }) => {
  const { maintenance } = useApp();

  return (
    <ReactDOMRoute
      path={path}
      exact={exact}
      render={() => {
        return maintenance ? <Maintenance /> : <Component />;
      }}
    />
  );
};

export default Route;
