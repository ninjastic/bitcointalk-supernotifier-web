import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import AdminHome from '../pages/Admin/Home';
import AdminLogin from '../pages/Admin/Login';
import NoMatch from '../pages/NoMatch';
import Addresses from '../pages/Addresses';

export default function Routes() {
  const homePath = ['/', '/post/:id', '/topic/:topicId'];

  return (
    <Switch>
      <Route path={homePath} exact component={Home} />
      <Route path="/admin" exact component={AdminHome} />
      <Route path="/admin/login" exact component={AdminLogin} />
      <Route path="/addresses" exact component={Addresses} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
}
