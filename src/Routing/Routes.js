import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Builder from '../Components/Builder/Builder';
import Matrix from '../Components/Matrix/Matrix';
import Templates from '../Components/Templates/Templates';

export function Routes() {
  return (
    <Switch>
      <Route path='/templates' component={Templates} />
      <Route path='/builder' component={Builder} />
      <Route path='/matrix' component={Matrix} />

      {/* redirect user to Templates page if route does not exist */}

      <Route component={Templates} />
    </Switch>
  );
}
