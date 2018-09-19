import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SignIn from './Authentication/components/SignIn'
import SearchStocks from './SearchStocks/components/SearchStocks'

const App = () => (
  <div className="app-routes">
    <BrowserRouter>
      <Switch>
        <Route path="/search_stocks" component={SearchStocks} />
        <Route path="/" component={SignIn} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;