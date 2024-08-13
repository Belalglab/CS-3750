import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AccountSummary from './components/AccountSummary';
import Transaction from './components/Transaction';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/account-summary" component={AccountSummary} />
          <Route path="/transaction" component={Transaction} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
